const User = require("../models/user");
const Profile = require("../models/profile");
const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");

const jwt = require("../utils/jwt");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");

// ================= SEND OTP =================

exports.sendOTP = async (req, res) => {
    try {
        let { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success:false,
                message:"Email is required"
            });
        }

        email = email?.trim().toLowerCase();

        const userExists = await User.findOne({
            email
        });

        if(userExists){
            return res.status(409).json({
                success:false,
                message:"User already registered"
            });
        }

        // remove old OTPs
        await OTP.deleteMany({
            email
        });

        const otp = otpGenerator.generate(
            6,
            {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            }
        );

        const name = email
            .split("@")[0]
            .replace(/[0-9]/g," ");

        await OTP.create({
            email,
            otp: String(otp).trim(),
        });

        await mailSender(
            email,
            "OTP Verification Email",
            otpTemplate(
                otp,
                name
            )
        );

        return res.status(200).json({
            success:true,
            message:"OTP sent successfully"
        });
    }
    catch(error){
        console.error(
            "OTP Error:",
            error
        );

        return res.status(500).json({
            success:false,
            message:"OTP generation failed",
            error:error.message
        });
    }
};

// ================= SIGNUP =================

exports.signup = async(req,res)=>{
    try{
        let {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        email = email?.trim().toLowerCase();

        if(
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword ||
            !accountType ||
            !otp
        ){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        if(password.length < 8){
            return res.status(400).json({
                success:false,
                message:"Password must be at least 8 characters"
            });
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:
                "Password and confirm password do not match"
            });
        }

        const existingUser =
            await User.findOne({
                email
            });

        if(existingUser){
            return res.status(409).json({
                success:false,
                message:"User already exists"
            });
        }

        // Find latest OTP
        const recentOTP = await OTP.findOne({ email }).sort({ createdAt: -1 });

        if (!recentOTP) {
            return res.status(400).json({
                success: false,
                message: "OTP not found or expired",
            });
        }

        // Normalize both OTPs
        const enteredOTP = String(otp).trim();
        const savedOTP = String(recentOTP.otp).trim();

        // Compare OTP
        if (enteredOTP !== savedOTP) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        const profile =
            await Profile.create({
                gender:null,
                dateOfBirth:null,
                about:null,
                contactNumber:
                contactNumber || null
            });

        const approved =
            accountType === "Instructor"
            ? false
            : true;

        const user =
            await User.create({
                firstName,
                lastName,
                email,
                password:hashedPassword,
                accountType,
                contactNumber,
                additionalDetails:
                profile._id,
                approved,
                image:
                `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`
            });

        await OTP.deleteMany({
            email
        });

        return res.status(201).json({
            success:true,
            message:
            "User Registered Successfully",
            user:{
                id:user._id,
                email:user.email
            }
        });
    }
    catch (error) {
        console.error("SIGNUP API ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Signup failed",
        });
    }
};

// ================= LOGIN =================

exports.login = async(req,res)=>{
    try{
        let {
            email,
            password
        } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Email and password are required"
            });
        }

        email = email?.trim().toLowerCase();

        let user =
            await User.findOne({
                email
            })
            .populate("additionalDetails");

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        if(!user.active){
            return res.status(403).json({
                success:false,
                message:"Account is inactive"
            });
        }

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if(!passwordMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid password"
            });
        }

        const payload = {
            id:user._id,
            email:user.email,
            accountType:user.accountType
        };

        const token =
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn:"24h"
                }
            );

        user = user.toObject();

        // remove sensitive information
        delete user.password;
        delete user.token;
        delete user.resetPasswordToken;
        delete user.resetPasswordTokenExpires;

        const cookieOptions = {
            expires:
            new Date(
                Date.now()
                +
                24 * 60 * 60 * 1000
            ),
            httpOnly:true,
            secure:
            process.env.NODE_ENV === "production",
            sameSite:"lax"
        };

        return res
        .cookie(
            "token",
            token,
            cookieOptions
        )
        .status(200)
        .json({
            success:true,
            token,
            user,
            message:
            "User logged in successfully"
        });
    }
    catch(error){
        console.error(
            "Login Error:",
            error
        );

        return res.status(500).json({
            success:false,
            message:"Login failed",
            error:error.message
        });
    }
};

// ================= CHANGE PASSWORD =================

exports.changePassword = async(req,res)=>{
    try{
        const {
            oldPassword,
            newPassword,
            confirmNewPassword
        } = req.body;

        if(
            !oldPassword ||
            !newPassword ||
            !confirmNewPassword
        ){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        if(oldPassword === newPassword){
            return res.status(400).json({
                success:false,
                message:"New password must be different"
            });
        }

        if(newPassword.length < 8){
            return res.status(400).json({
                success:false,
                message:"New password must be at least 8 characters"
            });
        }

        const user =
            await User.findById(
                req.user.id
            );

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        const passwordMatch =
            await bcrypt.compare(
                oldPassword,
                user.password
            );

        if(!passwordMatch){
            return res.status(401).json({
                success:false,
                message:"Old password is incorrect"
            });
        }

        if(
            newPassword !==
            confirmNewPassword
        ){
            return res.status(400).json({
                success:false,
                message:
                "Password confirmation does not match"
            });
        }

        user.password =
            await bcrypt.hash(
                newPassword,
                10
            );

        await user.save();

        await mailSender(
            user.email,
            "Password Updated Successfully",
            passwordUpdated(
                user.email,
                user.firstName
            )
        );

        return res.status(200).json({
            success:true,
            message:
            "Password changed successfully"
        });
    }
    catch(error){
        console.error(
            "Change Password Error:",
            error
        );

        return res.status(500).json({
            success:false,
            message:
            "Password change failed",
            error:error.message
        });
    }
};