const fs = require("fs");
const cloudinary = require("cloudinary").v2;

// ================= Upload Resource =================
exports.uploadImageToCloudinary = async (
    file,
    folder,
    resourceType = "auto",
    height,
    quality
) => {
    try {
        if (!file) {
            throw new Error("No file provided.");
        }

        // ================= MIME Type Validation =================
        const allowedImageTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ];

        const allowedVideoTypes = [
            "video/mp4",
            "video/webm",
            "video/quicktime", // .mov
        ];

        // Handle auto resource type
        if (resourceType === "auto") {
            if (allowedImageTypes.includes(file.mimetype)) {
                resourceType = "image";
            } else if (allowedVideoTypes.includes(file.mimetype)) {
                resourceType = "video";
            } else {
                throw new Error(
                    "Only JPG, JPEG, PNG, WEBP, MP4, WEBM and MOV files are allowed."
                );
            }
        }

        // Explicit image validation
        if (
            resourceType === "image" &&
            !allowedImageTypes.includes(file.mimetype)
        ) {
            throw new Error(
                "Only JPG, JPEG, PNG and WEBP image files are allowed."
            );
        }

        // Explicit video validation
        if (
            resourceType === "video" &&
            !allowedVideoTypes.includes(file.mimetype)
        ) {
            throw new Error(
                "Only MP4, WEBM and MOV video files are allowed."
            );
        }

        const options = {
            folder,
            resource_type: resourceType,
        };

        if (height) {
            options.height = height;
        }

        if (quality) {
            options.quality = quality;
        }

        const result = await cloudinary.uploader.upload(
            file.tempFilePath,
            options
        );

        // Remove temporary file
        if (file?.tempFilePath && fs.existsSync(file.tempFilePath)) {
            fs.unlinkSync(file.tempFilePath);
        }

        return result;
    } catch (error) {
        // Cleanup temp file on failure
        if (file?.tempFilePath && fs.existsSync(file.tempFilePath)) {
            fs.unlinkSync(file.tempFilePath);
        }

        console.error("Error while uploading resource:", error);
        throw error;
    }
};

// ================= Delete Resource =================
exports.deleteResourceFromCloudinary = async (
    url,
    resourceType = "image"
) => {
    try {
        if (!url) return;

        const uploadIndex = url.indexOf("/upload/");

        if (uploadIndex === -1) return;

        let publicId = url.substring(uploadIndex + 8);

        // Remove transformations if present
        publicId = publicId.replace(/^.*?(v\d+\/)/, "");

        // Remove version
        publicId = publicId.replace(/^v\d+\//, "");

        // Remove extension
        publicId = publicId.split(".")[0];

        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
        });

        return result;
    } catch (error) {
        console.error("Error while deleting resource:", error);
        throw error;
    }
};