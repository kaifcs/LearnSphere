const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    // Not known until the user actually pays, so this starts empty on a
    // "Pending" record created at order-creation time and is filled in once
    // verifyPayment confirms the signature. `sparse` keeps the unique index
    // from treating multiple missing values as duplicates of each other.
    paymentId: {
        type: String,
        unique: true,
        sparse: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Success", "Failed"],
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Abandoned checkouts (order created, never paid/verified) stay "Pending"
// forever otherwise — auto-remove them 1 hour after creation. The partial
// filter excludes "Success"/"Failed" records, which are kept indefinitely
// for purchase history.
paymentSchema.index(
    { createdAt: 1 },
    { expireAfterSeconds: 60 * 60, partialFilterExpression: { status: "Pending" } }
);

module.exports = mongoose.model("Payment", paymentSchema);
