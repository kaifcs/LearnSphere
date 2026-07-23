const Razorpay = require("razorpay");

exports.instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

// const Razorpay = require('razorpay');
// require('dotenv').config();

// const missingCredentialsMessage = 'Razorpay credentials are not configured';

// let razorpayInstance;

// const isConfigured = () => Boolean(process.env.RAZORPAY_KEY && process.env.RAZORPAY_SECRET);

// const createConfigurationError = () => {
//     const error = new Error(missingCredentialsMessage);
//     error.code = 'RAZORPAY_CONFIG_MISSING';
//     return error;
// };

// const getInstance = () => {
//     if (!isConfigured()) {
//         throw createConfigurationError();
//     }

//     if (!razorpayInstance) {
//         razorpayInstance = new Razorpay({
//             key_id: process.env.RAZORPAY_KEY,
//             key_secret: process.env.RAZORPAY_SECRET
//         });
//     }

//     return razorpayInstance;
// };

// Object.defineProperty(exports, 'instance', {
//     enumerable: true,
//     get: getInstance,
// });

// exports.getInstance = getInstance;
// exports.isConfigured = isConfigured;
// exports.missingCredentialsMessage = missingCredentialsMessage;
