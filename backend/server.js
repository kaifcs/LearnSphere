// ================= Environment =================
require("dotenv").config();

// ================= Packages =================
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Required when deploying behind Render/Railway/Heroku/Nginx
app.set("trust proxy", 1);

// ================= Database & Cloudinary =================
const { connectDB } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

// ================= Routes =================
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const paymentRoutes = require("./routes/payments");
const courseRoutes = require("./routes/course");
const contactRoutes = require("./routes/contact");

// ================= Middleware =================
const errorHandler = require("./middleware/errorHandler");

// ================= Security =================
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests. Please try again after 15 minutes.",
    },
});

// ================= Core Middleware =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use(
    helmet({
        crossOriginResourcePolicy: {
            policy: "cross-origin",
        },
    })
);

// ================= CORS =================
const allowedOrigins = [
    "http://localhost:5173",
    process.env.CLIENT_URL,
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow Postman/server-to-server requests
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
        ],
    })
);

// ================= File Upload =================
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "./tmp/",
        createParentPath: true,
        limits: {
            fileSize: 50 * 1024 * 1024, // 50 MB
        },
        abortOnLimit: true,
        responseOnLimit: "File size exceeds the 50MB limit.",
    })
);

// ================= Rate Limiting =================
app.use("/api/v1/auth", authLimiter);

// ================= API Routes =================
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/reach", contactRoutes);

// ================= Root Route =================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 LearnSphere API is running successfully",
    });
});

// ================= Health Check =================
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is healthy",
        timestamp: new Date().toISOString(),
    });
});

// ================= 404 Handler =================
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

// ================= Global Error Handler =================
app.use(errorHandler);

// ================= Server =================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        cloudinaryConnect();

        app.listen(PORT, () => {
            console.log(`🚀 Server Started on PORT ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
};

startServer();