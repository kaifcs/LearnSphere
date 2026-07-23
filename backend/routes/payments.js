const express = require("express");
const router = express.Router();

const {
    capturePayment,
    verifyPayment,
    sendPaymentSuccessEmail,
    getPurchaseHistory,
} = require("../controllers/payments");

const { auth, isStudent } = require("../middleware/auth");

// Capture Razorpay Order
router.post("/capturePayment", auth, isStudent, capturePayment);

// Verify Razorpay Payment
router.post("/verifyPayment", auth, isStudent, verifyPayment);

// Send Payment Success Email
router.post(
    "/sendPaymentSuccessEmail",
    auth,
    isStudent,
    sendPaymentSuccessEmail
);

// Get Purchase History
router.get("/purchase-history", auth, isStudent, getPurchaseHistory);

module.exports = router;