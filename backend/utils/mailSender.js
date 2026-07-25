const { BrevoClient } = require("@getbrevo/brevo");


const mailSender = async (email, title, body) => {
    try {

        const client = new BrevoClient({
            apiKey: process.env.BREVO_API_KEY,
        });

        const response = await client.transactionalEmails.sendTransacEmail({

            sender: {
                email: process.env.MAIL_FROM_EMAIL,
                name: process.env.MAIL_FROM_NAME,
            },

            to: [
                {
                    email: email,
                },
            ],

            subject: title,

            htmlContent: body,
        });


        console.log(
            "Email sent successfully to:",
            email
        );


        return response;


    } catch (error) {

        console.error(
            "Email sending failed:",
            email
        );

        console.error(
            error?.response?.body || error.message
        );

        throw error;
    }
};


module.exports = mailSender;