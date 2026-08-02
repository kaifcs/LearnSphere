const User = require('../models/user');
const mailSender = require('../utils/mailSender');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// ================ resetPasswordToken ================
exports.resetPasswordToken = async (req, res) => {
    try {
        // extract email 
        const { email } = req.body;

        // email validation
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Your Email is not registered with us'
            });
        }

        // generate token — the raw value goes in the email link; only its
        // hash is ever stored, so a database read alone can't produce a
        // working reset link
        const token = crypto.randomBytes(20).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        // update user by adding token & token expire date
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { token: hashedToken, resetPasswordTokenExpires: Date.now() + 5 * 60 * 1000 },
            { new: true }); // by marking true, it will return updated user


        // create url
        const url = `${process.env.CLIENT_URL}/update-password/${token}`;

        // send email containing url
        await mailSender(email, 'Password Reset Link', `Password Reset Link : ${url}`);

        // return succes response
        res.status(200).json({
            success: true,
            message: 'Email sent successfully , Please check your mail box and change password'
        })
    }

    catch (error) {
        console.error('Error while creating token for reset password');
        console.error(error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while creating token for reset password'
        })
    }
}



// ================ resetPassword ================
exports.resetPassword = async (req, res) => {
    try {
        // extract data
        // extract token by anyone from this 3 ways
        const token = req.body?.token || req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');

        const { password, confirmPassword } = req.body;

        // validation
        if (!token || !password || !confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "All fiels are required...!"
            });
        }

        // validate both passwords
        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: 'Passowrds are not matched'
            });
        }

        // The stored value is a hash of the token, never the raw token
        // itself — hash the incoming token the same way and look it up by
        // hash, so plaintext tokens are never compared or stored.
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        // find user by hashed token from DB
        const userDetails = await User.findOne({ token: hashedToken });

        // No user matched this hash: token is invalid, forged, or was
        // already used and cleared by a previous successful reset.
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: 'This password reset link is invalid or has already been used'
            });
        }

        // check token is expire or not
        if (!(userDetails.resetPasswordTokenExpires > Date.now())) {
            return res.status(400).json({
                success: false,
                message: 'This password reset link has expired, please request a new one'
            });
        }

        // hash new passoword
        const hashedPassword = await bcrypt.hash(password, 10);

        // update user with new password, and clear the reset token so this
        // link cannot be used again
        await User.findOneAndUpdate(
            { token: hashedToken },
            { password: hashedPassword, token: null, resetPasswordTokenExpires: null },
            { new: true });

        res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        });
    }

    catch (error) {
        console.error('Error while reseting password');
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while reseting password'
        });
    }
}