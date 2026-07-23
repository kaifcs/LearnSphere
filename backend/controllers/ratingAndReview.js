const Course = require("../models/course");
const RatingAndReview = require("../models/ratingAndReview");
const mongoose = require("mongoose");

// ================ Create Rating ================
exports.createRating = async (req, res) => {
    try {
        // get data
        const { rating, review, courseId } = req.body;
        const userId = req.user.id;

        // validation
        if (!rating || !review || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Course ID",
            });
        }

        // check course exists
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // check user is enrolled in course
        const isEnrolled = course.studentsEnrolled.some(
            (studentId) => studentId.toString() === userId
        );

        if (!isEnrolled) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the course",
            });
        }

        // check user already reviewed
        const alreadyReviewed = await RatingAndReview.findOne({
            course: courseId,
            user: userId,
        });

        if (alreadyReviewed) {
            return res.status(409).json({
                success: false,
                message: "Course is already reviewed by the user",
            });
        }

        // create rating
        const ratingReview = await RatingAndReview.create({
            user: userId,
            course: courseId,
            rating,
            review,
        });

        // link rating to course
        await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    ratingAndReviews: ratingReview._id,
                },
            },
            {
                new: true,
            }
        );

        return res.status(200).json({
            success: true,
            data: ratingReview,
            message: "Rating and Review created successfully",
        });

    } catch (error) {

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "You have already reviewed this course",
            });
        }

        console.error("Error while creating rating and review:", error);

        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while creating rating and review",
        });
    }
};


// ================ Get Average Rating ================
exports.getAverageRating = async (req, res) => {
    try {

        // get course ID
        const { courseId } = req.query;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Course ID",
            });
        }

        // calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: {
                        $avg: "$rating",
                    },
                },
            },
        ]);

        // return average rating
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            });
        }

        // if no ratings exist
        return res.status(200).json({
            success: true,
            averageRating: 0,
            message: "Average rating is 0, no ratings given till now",
        });

    } catch (error) {

        console.error("Error while calculating average rating:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ================ Get All Rating And Reviews ================
exports.getAllRatingReview = async (req, res) => {
    try {

        const allReviews = await RatingAndReview.find({})
            .sort({
                rating: -1,
                createdAt: -1,
            })
            .populate({
                path: "user",
                select: "firstName lastName email image",
            })
            .populate({
                path: "course",
                select: "courseName",
            });

        return res.status(200).json({
            success: true,
            data: allReviews,
            message: "All reviews fetched successfully",
        });

    } catch (error) {

        console.error("Error while fetching all ratings:", error);

        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while fetching all ratings",
        });
    }
};