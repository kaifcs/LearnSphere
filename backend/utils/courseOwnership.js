const Course = require("../models/course");

// True if `userId` is the instructor who owns `course`.
exports.isCourseOwner = (course, userId) => {
    return course.instructor.toString() === userId.toString();
};

// Section documents don't store a reference back to their parent course,
// so section/subsection ownership checks resolve the owning course via
// Course.courseContent instead of trusting a client-supplied courseId.
exports.findCourseBySectionId = async (sectionId) => {
    return await Course.findOne({ courseContent: sectionId });
};
