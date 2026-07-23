const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"],
        },

        rating: {
            type: Number,
            required: [true, "Rating is required"],
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating cannot be greater than 5"],
        },

        review: {
            type: String,
            required: [true, "Review is required"],
            trim: true,
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: [true, "Course is required"],
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate reviews from the same user for the same course
ratingAndReviewSchema.index(
    { user: 1, course: 1 },
    { unique: true }
);

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);