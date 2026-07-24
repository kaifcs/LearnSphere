const brevo = require("@getbrevo/brevo");


const mailSender = async (email, title, body) => {
    try {

        const apiInstance = new brevo.TransactionalEmailsApi();

        apiInstance.setApiKey(
            brevo.TransactionalEmailsApiApiKeys.apiKey,
            process.env.BREVO_API_KEY
        );


        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.sender = {
            email: process.env.MAIL_USER,
            name: "LearnSphere",
        };


        sendSmtpEmail.to = [
            {
                email: email,
            },
        ];


        sendSmtpEmail.subject = title;

        sendSmtpEmail.htmlContent = body;


        const response = await apiInstance.sendTransacEmail(
            sendSmtpEmail
        );


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