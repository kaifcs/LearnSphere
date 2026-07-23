const Section = require("../models/section");
const SubSection = require("../models/subSection");

const {
    uploadImageToCloudinary,
    deleteResourceFromCloudinary
} = require("../utils/imageUploader");

// ================ create SubSection ================
exports.createSubSection = async (req, res) => {
    try {
        const { title, description, sectionId } = req.body;

        if (!title || !description || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Title, Description and Section ID are required",
            });
        }

        if (!req.files || !req.files.video) {
            return res.status(400).json({
                success: false,
                message: "Video file is required",
            });
        }

        const section = await Section.findById(sectionId);

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        const videoFileDetails = await uploadImageToCloudinary(
            req.files.video,
            process.env.FOLDER_NAME,
            "video"
        );

        const subSectionDetails = await SubSection.create({
            title,
            description,
            timeDuration: videoFileDetails.duration,
            videoUrl: videoFileDetails.secure_url,
        });

        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push: {
                    subSection: subSectionDetails._id,
                },
            },
            {
                new: true
            }
        ).populate("subSection");

        return res.status(200).json({
            success: true,
            data: updatedSection,
            message: "SubSection created successfully",
        });
    } catch (error) {
        console.error("Error while creating SubSection:", error);

        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while creating SubSection",
        });
    }
};

// ================ Update SubSection ================
exports.updateSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId, title, description } = req.body;

        if (!sectionId || !subSectionId) {
            return res.status(400).json({
                success: false,
                message: "Section ID and SubSection ID are required",
            });
        }

        const section = await Section.findById(sectionId);

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }

        if (title) {
            subSection.title = title;
        }

        if (description) {
            subSection.description = description;
        }

        // Replace video if new video uploaded
        if (req.files?.video) {
            // Upload new video first
            const uploadDetails = await uploadImageToCloudinary(
                req.files.video,
                process.env.FOLDER_NAME,
                "video"
            );

            // Delete old video
            try {
                await deleteResourceFromCloudinary(
                    subSection.videoUrl,
                    "video"
                );
            } catch (error) {
                console.error(
                    "Old video deletion failed:",
                    error.message
                );
            }

            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = uploadDetails.duration;
        }

        await subSection.save();

        const updatedSection = await Section.findById(sectionId)
            .populate("subSection");

        return res.status(200).json({
            success: true,
            data: updatedSection,
            message: "SubSection updated successfully",
        });
    } catch (error) {
        console.error("Error while updating SubSection:", error);

        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while updating SubSection",
        });
    }
};

// ================ Delete SubSection ================
exports.deleteSubSection = async (req, res) => {
    try {
        const {
            subSectionId,
            sectionId
        } = req.body;

        if (!subSectionId || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "SubSection ID and Section ID are required",
            });
        }

        const section = await Section.findById(sectionId);

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }

        // Delete video from Cloudinary
        try {
            await deleteResourceFromCloudinary(
                subSection.videoUrl,
                "video"
            );
        } catch (error) {
            console.error(
                "Cloudinary video deletion failed:",
                error.message
            );
        }

        // Remove subsection reference
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $pull: {
                    subSection: subSectionId,
                },
            },
            {
                new: true,
            }
        ).populate("subSection");

        // Delete subsection from database
        await SubSection.findByIdAndDelete(subSectionId);

        return res.status(200).json({
            success: true,
            data: updatedSection,
            message: "SubSection deleted successfully",
        });
    } catch (error) {
        console.error("Error while deleting SubSection:", error);

        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while deleting SubSection",
        });
    }
};