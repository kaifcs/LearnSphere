const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
    {
        sectionName: {
            type: String,
            required: [true, "Section name is required"],
            trim: true,
        },

        subSection: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SubSection",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Section", sectionSchema);