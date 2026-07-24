const nodemailer = require("nodemailer");

const mailPort = Number(process.env.MAIL_PORT) || 2525;

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: mailPort,
    secure: mailPort === 465,

    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },

    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
});


const mailSender = async (email, title, body) => {
    try {

        const info = await transporter.sendMail({
            from: `"LearnSphere" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
        });

        return info;

    } catch (error) {

        console.error(
            `Email sending failed for ${email}:`,
            error.message
        );

        throw error;
    }
};


module.exports = mailSender;