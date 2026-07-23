const Course = require('../models/course');
const Section = require('../models/section');
const SubSection = require("../models/subSection");

const {
    deleteResourceFromCloudinary
} = require("../utils/imageUploader");

// ================ create Section ================
exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;

        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Section Name and Course ID are required"
            });
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const newSection = await Section.create({
            sectionName
        });

        await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id
                }
            },
            {
                new: true
            }
        );

        const updatedCourseDetails = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            });

        return res.status(200).json({
            success: true,
            updatedCourseDetails,
            message: "Section created successfully"
        });
    } catch (error) {
        console.error("Error while creating section:", error);

        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while creating section"
        });
    }
};

// ================ update Section ================
exports.updateSection = async (req, res) => {
    try {
        const {
            sectionName,
            sectionId,
            courseId
        } = req.body;

        if (!sectionName || !sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Section Name, Section ID and Course ID are required"
            });
        }

        const section = await Section.findById(sectionId);

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found"
            });
        }

        section.sectionName = sectionName;

        await section.save();

        const updatedCourseDetails = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            });

        return res.status(200).json({
            success: true,
            data: updatedCourseDetails,
            message: "Section updated successfully"
        });
    } catch (error) {
        console.error("Error while updating section:", error);

        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while updating section"
        });
    }
};

// ================ Delete Section ================
exports.deleteSection = async (req, res) => {
    try {
        const {
            sectionId,
            courseId
        } = req.body;

        if (!sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Section ID and Course ID are required"
            });
        }

        const section = await Section.findById(sectionId);

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found"
            });
        }

        // Find all subsections
        const subSections = await SubSection.find({
            _id: {
                $in: section.subSection
            }
        });

        // Delete subsection videos + documents
        for (const subSection of subSections) {
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

            await SubSection.findByIdAndDelete(
                subSection._id
            );
        }

        // Remove section from course
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $pull: {
                    courseContent: sectionId
                }
            },
            {
                new: true
            }
        );

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // Delete section
        await Section.findByIdAndDelete(sectionId);

        const updatedCourseDetails = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            });

        return res.status(200).json({
            success: true,
            data: updatedCourseDetails,
            message: "Section deleted successfully"
        });
    } catch (error) {
        console.error("Error while deleting section:", error);

        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while deleting section"
        });
    }
};