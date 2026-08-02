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

        // Record what this order was actually created for. This is the
        // only source of truth verifyPayment will trust when deciding what
        // to enroll, so a client can't pay for one order and then request
        // enrollment into a different, more expensive set of courses.
        await Payment.create({
            userId,
            courses: coursesId,
            orderId: paymentResponse.id,
            amount: totalAmount,
            status: "Pending",
        });

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
    const userId = req.user.id;

    // Note: the frontend still sends `coursesId` in this request body (kept
    // for backward compatibility with the existing checkout call), but it
    // is intentionally never read below — see the comment further down.
    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !userId
    ) {
        return res.status(400).json({
            success: false,
            message: "Payment Failed, data not found",
        });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({
            success: false,
            message: "Payment verification failed",
        });
    }

    // The signature only proves a real payment happened for this order_id —
    // it says nothing about which courses that order was for. The trusted
    // answer to that question was recorded server-side in capturePayment,
    // so we look it up instead of trusting req.body.coursesId. Matching on
    // `userId` (from the verified JWT, not the request body) also ensures
    // a caller can't verify/claim an order that belongs to someone else.
    //
    // The atomic Pending -> Success transition (only succeeds if the record
    // is still Pending) doubles as replay protection: a second verification
    // attempt for the same order finds no matching Pending record and never
    // re-runs enrollment.
    const paymentRecord = await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id, userId, status: "Pending" },
        { paymentId: razorpay_payment_id, status: "Success" },
        { new: false } // return the pre-update doc so we still have its `courses`
    );

    if (!paymentRecord) {
        const existing = await Payment.findOne({ orderId: razorpay_order_id, userId });

        if (existing?.status === "Success") {
            // Already verified by an earlier (possibly replayed) request —
            // respond the same way without re-running enrollment.
            return res.status(200).json({
                success: true,
                message: "Payment Verified",
            });
        }

        return res.status(404).json({
            success: false,
            message: "No matching pending order found for this payment",
        });
    }

    // Enroll student using the server-recorded course list, never req.body
    const enrollErrorResponse = await enrollStudents(paymentRecord.courses, userId, res);

    if (enrollErrorResponse) {
        // Enrollment failed after the record was marked Success — revert so
        // the order isn't stuck "paid" without the student being enrolled.
        await Payment.updateOne(
            { _id: paymentRecord._id },
            { status: "Pending", $unset: { paymentId: "" } }
        );

        return; // enrollErrorResponse already sent a response
    }

    return res.status(200).json({
        success: true,
        message: "Payment Verified",
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

        // Orders now start "Pending" at capturePayment and only become
        // "Success" once verified — exclude anything else so abandoned or
        // never-completed checkouts don't show up as purchase history.
        const purchaseHistory = await Payment.find({ userId: userId, status: "Success" })
            .populate("courses", "courseName thumbnail price")
            .sort({ createdAt: -1 })
            .lean();

        const filteredHistory = purchaseHistory
            .map((payment) => ({
                ...payment,
                courses: payment.courses.filter(Boolean),
            }))
            .filter((payment) => payment.courses.length > 0);

        return res.status(200).json({
            success: true,
            data: filteredHistory,
            message:
                filteredHistory.length
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