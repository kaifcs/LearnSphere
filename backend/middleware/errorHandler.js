// Express identifies error-handling middleware by its arity (exactly 4
// params) — removing the unused `next` would make Express treat this as
// regular middleware instead of an error handler.
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
        console.error("[ERROR]:", err);

        return res.status(err.statusCode).json({
            success: false,
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }

    if (err.isOperational) {
        return res.status(err.statusCode).json({
            success: false,
            status: err.status,
            message: err.message,
        });
    }

    return res.status(500).json({
        success: false,
        status: "error",
        message: "Something went wrong!",
    });
};

module.exports = errorHandler;