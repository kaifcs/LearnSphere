const SubSection = require("../models/subSection")
const CourseProgress = require("../models/courseProgress")

// ================ update Course Progress ================
exports.updateCourseProgress = async (req, res) => {
    const { courseId, subsectionId } = req.body
    const userId = req.user.id

    try {
        const subsection = await SubSection.findById(subsectionId)

        if (!subsection) {
            return res.status(404).json({
                success: false,
                message: "Invalid subsection",
            })
        }

        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userId,
        })

        if (!courseProgress) {
            return res.status(404).json({
                success: false,
                message: "Course progress does not exist",
            })
        }

        if (courseProgress.completedVideos.includes(subsectionId)) {
            return res.status(400).json({
                success: false,
                message: "Subsection already completed",
            })
        }

        courseProgress.completedVideos.push(subsectionId)

        await courseProgress.save()

        return res.status(200).json({
            success: true,
            message: "Course progress updated successfully",
        })
    } catch (error) {
        console.error("Update Course Progress Error:", error)

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

// ================ get Progress Percentage ================
exports.getProgressPercentage = async (req, res) => {
    const { courseId } = req.body
    const userId = req.user.id

    if (!courseId) {
        return res.status(400).json({
            success: false,
            message: "Course ID not provided",
        })
    }

    try {
        const courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userId,
        }).populate({
            path: "courseID",
            populate: {
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            },
        })

        if (!courseProgress) {
            return res.status(404).json({
                success: false,
                message: "Course progress not found",
            })
        }

        let totalLectures = 0

        courseProgress.courseID.courseContent.forEach((section) => {
            totalLectures += section.subSection?.length || 0
        })

        const completedLectures = courseProgress.completedVideos.length

        const progressPercentage =
          totalLectures === 0
              ? 0
              : Math.min(
                  100,
                  Number(((completedLectures / totalLectures) * 100).toFixed(2))
              )

        return res.status(200).json({
            success: true,
            data: progressPercentage,
            message: "Course progress fetched successfully",
        })
    } catch (error) {
        console.error("Get Progress Percentage Error:", error)

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}