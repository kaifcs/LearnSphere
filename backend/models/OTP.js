const mongoose = require("mongoose");


const OTPSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        index: true,
    },

    otp: {
        type: String,
        required: true,
        trim: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60,
    }

});


module.exports = mongoose.model("OTP", OTPSchema);