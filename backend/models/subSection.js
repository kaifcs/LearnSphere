const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "SubSection title is required"],
            trim: true,
        },

        timeDuration: {
            type: String,
            required: [true, "Video duration is required"],
        },

        description: {
            type: String,
            required: [true, "SubSection description is required"],
            trim: true,
        },

        videoUrl: {
            type: String,
            required: [true, "Video URL is required"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("SubSection", subSectionSchema);