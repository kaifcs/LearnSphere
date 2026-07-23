const Category = require("../models/category");

// get Random Integer
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

// ================ create Category ================
exports.createCategory = async (req, res) => {
    try {
        // extract data
        const { name, description } = req.body;

        // validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const categoryDetails = await Category.create({
            name: name, description: description
        });

        res.status(200).json({
            success: true,
            message: 'Category created successfully'
        });
    }
    catch (error) {
        console.error('Error while creating Category');
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error while creating Category',
            error: error.message
        })
    }
}


// ================ get All Category ================
exports.showAllCategories = async (req, res) => {
    try {
        // get all category from DB
        const allCategories = await Category.find({}, { name: true, description: true });

        // return response
        res.status(200).json({
            success: true,
            data: allCategories,
            message: 'All allCategories fetched successfully'
        })
    }
    catch (error) {
        console.error('Error while fetching all allCategories');
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error while fetching all allCategories'
        })
    }
}



// ================ Get Category Page Details ================
exports.getCategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        // Get selected category
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: "ratingAndReviews",
            })
            .exec();

        // Category not found
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // Get other categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        });

        let differentCategory = null;

        if (categoriesExceptSelected.length > 0) {
            differentCategory = await Category.findById(
                categoriesExceptSelected[
                    getRandomInt(categoriesExceptSelected.length)
                ]._id
            )
                .populate({
                    path: "courses",
                    match: { status: "Published" },
                })
                .exec();
        }

        // Get all published courses
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                },
            })
            .exec();

        const allCourses = allCategories.flatMap(
            (category) => category.courses || []
        );

        allCourses.sort(
            (a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length
        );

        const mostSellingCourses = allCourses.slice(0, 10);

        // Always return success (even if no courses exist)
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
            message:
                selectedCategory.courses.length === 0
                    ? "No courses found for the selected category."
                    : "Category page data fetched successfully.",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};