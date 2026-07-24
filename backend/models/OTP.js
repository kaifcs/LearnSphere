const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const otpTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },

    otp: {
        type: String,
        required: true,
        trim: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60
    }

});


// function to send email
async function sendVerificationEmail(email, otp) {
    try {

        await mailSender(
            email,
            "OTP Verification Email",
            otpTemplate(otp)
        );

        // console.log('Email sent successfully to - ', email);
        // console.log('OTP sent successfully to - ', otp);

    } catch (error) {

        console.error('Error while sending an email to ', email);
        throw error;

    }
}


// pre middleware
OTPSchema.pre('save', async function () {

    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }

});


module.exports = mongoose.model('OTP', OTPSchema);