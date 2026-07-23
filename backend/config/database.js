const mongoose = require("mongoose");

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);

        console.log(
            `✅ MongoDB Atlas connected successfully: ${mongoose.connection.name}`
        );
    } catch (error) {
        console.error("❌ Error while connecting to MongoDB Atlas");
        console.error(error);
        process.exit(1);
    }
};