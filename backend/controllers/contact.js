const mailSender = require("../utils/mailSender");

exports.contactUs = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            email,
            countrycode,
            phoneNo,
            message,
        } = req.body;


        if (!firstname || !email || !phoneNo || !message) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing",
            });
        }


        await mailSender(
            process.env.MAIL_USER,
            "New Contact Request - LearnSphere",
            `
            <h2>New Contact Request - LearnSphere</h2>

            <p><b>Name:</b> ${firstname} ${lastname || ""}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${countrycode} ${phoneNo}</p>

            <h3>Message:</h3>
            <p>${message}</p>
            `
        );


        return res.status(200).json({
            success: true,
            message: "Message sent successfully",
        });

    } catch (error) {
        console.error("Contact Us Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to send message",
        });
    }
};