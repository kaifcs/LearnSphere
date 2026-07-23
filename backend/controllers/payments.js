const instance = require('../config/razorpay');
const crypto = require('crypto');
const mailSender = require('../utils/mailSender');
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessEmail');
require('dotenv').config();

const User = require('../models/user');
const Course = require('../models/course');
const CourseProgress = require("../models/courseProgress");
const Payment = require("../models/payment");

const mongoose = require("mongoose");

// ================ Capture the Payment and Initiate the Razorpay Order ================
exports.capturePayment = async (req, res) => {

    // Extract courseId & userId
    const { coursesId } = req.body;
    const userId = req.user.id;

    if (!coursesId || !Array.isArray(coursesId) || coursesId.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide at least one Course ID",
        });
    }

    if (!instance.instance) {
        return res.status(500).json({
            success: false,
            message: "Razorpay is not configured",
        });
    }

    let totalAmount = 0;

    for (const course_id of coursesId) {

        if (!mongoose.Types.ObjectId.isValid(course_id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Course ID",
            });
        }

        let course;

        try {

            // Validate course details
            course = await Course.findById(course_id);

            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: "Could not find the course",
                });
            }

            // Check if user is already enrolled in the course
            const isAlreadyEnrolled = course.studentsEnrolled.some(
                (studentId) => studentId.toString() === userId
            );

            if (isAlreadyEnrolled) {
                return res.status(400).json({
                    success: false,
                    message: "Student is already enrolled",
                });
            }

            totalAmount += course.price;

        } catch (error) {

            console.error("Capture Payment Error:", error);

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Create order
    const currency = "INR";

    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: `receipt_${Date.now()}`,
    };

    // Initiate payment using Razorpay
    try {

        const paymentResponse = await instance.instance.orders.create(options);

        // Return response
        return res.status(200).json({
            success: true,
            message: paymentResponse,
        });

    } catch (error) {

        console.error("Order Creation Error:", error);

        return res.status(500).json({
            success: false,
            message: "Could not initiate order.",
        });
    }
};



// ================ Verify the Payment ================
exports.verifyPayment = async (req, res) => {

    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.coursesId;
    const userId = req.user.id;

    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !Array.isArray(courses) ||
        courses.length === 0 ||
        !userId
    ) {
        return res.status(400).json({
            success: false,
            message: "Payment Failed, data not found",
        });
    }

    if (!instance.instance) {
        return res.status(500).json({
            success: false,
            message: "Razorpay is not configured",
        });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {

        // Enroll student
        const enrollErrorResponse = await enrollStudents(courses, userId, res);

        if (!enrollErrorResponse) {
            try {
                // Check if payment already exists
                const existingPayment = await Payment.findOne({ paymentId: razorpay_payment_id });
                
                if (!existingPayment) {
                    // Fetch order from Razorpay to get the exact amount
                    const order = await instance.instance.orders.fetch(razorpay_order_id);
                    
                    await Payment.create({
                        userId: userId,
                        courses: courses,
                        orderId: razorpay_order_id,
                        paymentId: razorpay_payment_id,
                        amount: order.amount / 100,
                        status: "Success"
                    });
                }
            } catch (error) {
                console.error("Error creating payment history:", error);
            }

            // Return response
            return res.status(200).json({
                success: true,
                message: "Payment Verified",
            });
        }
        
        return; // enrollErrorResponse already sent response
    }

    return res.status(400).json({
        success: false,
        message: "Payment verification failed",
    });
};


// ================ Enroll Students to Course after Payment ================
const enrollStudents = async (courses, userId, res) => {

    if (!Array.isArray(courses) || courses.length === 0 || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please Provide data for Courses or UserId",
        });
    }

    for (const courseId of courses) {

        try {

            // Find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                {
                    $addToSet: {
                        studentsEnrolled: new mongoose.Types.ObjectId(userId),
                    },
                },
                { new: true }
            );

            if (!enrolledCourse) {
                return res.status(404).json({
                    success: false,
                    message: "Course not Found",
                });
            }

            // Initialize course progress with 0 percent
            let courseProgress = await CourseProgress.findOne({
                courseID: courseId,
                userId: userId,
            });

            if (!courseProgress) {
                courseProgress = await CourseProgress.create({
                    courseID: courseId,
                    userId: userId,
                    completedVideos: [],
                });
            }

            // Find the student and add the course to their list of enrolled courses
            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {
                    $addToSet: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                    },
                },
                { new: true }
            );

            if (!enrolledStudent) {
                return res.status(404).json({
                    success: false,
                    message: "Student not found",
                });
            }

            // Send an email notification to the enrolled student
            await mailSender(
                enrolledStudent.email,
                `Course Enrollment Confirmed: ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(
                    enrolledCourse.courseName,
                    `${enrolledStudent.firstName}`
                )
            );

        } catch (error) {

            console.error("Enrollment Error:", error);

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
};



// ================ Send Payment Success Email ================
exports.sendPaymentSuccessEmail = async (req, res) => {

    const { orderId, paymentId, amount } = req.body;

    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the fields",
        });
    }

    try {

        // Find student
        const enrolledStudent = await User.findById(userId);

        if (!enrolledStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName}`,
                amount / 100,
                orderId,
                paymentId
            )
        );

        return res.status(200).json({
            success: true,
            message: "Payment success email sent",
        });

    } catch (error) {

        console.error("error in sending mail", error);

        return res.status(500).json({
            success: false,
            message: "Could not send email",
        });
    }
};

// ================ Get Purchase History ================
exports.getPurchaseHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        const purchaseHistory = await Payment.find({ userId: userId })
            .populate("courses", "courseName thumbnail price")
            .sort({ createdAt: -1 })
            .lean();

        return res.status(200).json({
            success: true,
            data: purchaseHistory,
            message:
                purchaseHistory.length
                    ? "Purchase history fetched successfully"
                    : "No purchase history found",
        });

    } catch (error) {
        console.error("Purchase History Error:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch purchase history",
        });
    }
};