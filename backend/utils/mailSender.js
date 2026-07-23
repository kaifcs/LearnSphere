const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const info = await transporter.sendMail({
            from: `LearnSphere <${process.env.MAIL_USER}>`,            
            to: email,
            subject: title,
            html: body
        });


        return info;
    }
    catch (error) {
        console.error('Error while sending mail (mailSender) - ', email);
        throw error;
    }
}

module.exports = mailSender;