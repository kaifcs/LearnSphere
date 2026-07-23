exports.paymentSuccessEmail = (
    name,
    amount,
    orderId,
    paymentId
) => {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Payment Successful | LearnSphere</title>

    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f5f7fa;
            font-family: Arial, Helvetica, sans-serif;
            color: #333333;
        }

        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }

        .header {
            padding: 30px 20px;
            text-align: center;
            background: #161D29;
        }

        .logo {
            width: 180px;
        }

        .content {
            padding: 35px;
        }

        h2 {
            color: #161D29;
            margin-top: 0;
            text-align: center;
        }

        p {
            line-height: 1.7;
            margin: 14px 0;
        }

        .summary {
            background: #F8F9FC;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }

        .summary p {
            margin: 10px 0;
        }

        .highlight {
            font-weight: bold;
            color: #000000;
        }

        .button {
            display: inline-block;
            margin-top: 25px;
            padding: 14px 28px;
            background-color: #FFD60A;
            color: #000000 !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
        }

        .center {
            text-align: center;
        }

        .footer {
            background: #F8F9FC;
            padding: 25px;
            text-align: center;
            font-size: 14px;
            color: #666666;
        }

        .footer a {
            color: #0F62FE;
            text-decoration: none;
        }

        hr {
            border: none;
            border-top: 1px solid #e5e5e5;
            margin: 30px 0;
        }
    </style>
</head>

<body>

    <div class="container">

        <div class="header">
            <a href="https://learnsphere.vercel.app">
                <img
                    class="logo"
                    src="https://i.ibb.co/7Xyj3PC/logo.png"
                    alt="LearnSphere Logo"
                />
            </a>
        </div>

        <div class="content">

            <h2>🎉 Payment Successful</h2>

            <p>Hi <strong>${name}</strong>,</p>

            <p>
                Thank you for choosing <strong>LearnSphere</strong>.
                Your payment has been processed successfully and your course
                enrollment has been confirmed.
            </p>

            <div class="summary">

                <p>
                    <strong>Amount Paid:</strong>
                    <span class="highlight">₹${amount}</span>
                </p>

                <p>
                    <strong>Order ID:</strong>
                    <span class="highlight">${orderId}</span>
                </p>

                <p>
                    <strong>Payment ID:</strong>
                    <span class="highlight">${paymentId}</span>
                </p>

                <p>
                    <strong>Status:</strong>
                    <span class="highlight">Successful ✅</span>
                </p>

            </div>

            <p>
                You can now access your enrolled courses and start learning
                immediately from your dashboard.
            </p>

            <div class="center">
                <a
                    href="https://learnsphere.vercel.app/dashboard/enrolled-courses"
                    class="button"
                >
                    View My Courses
                </a>
            </div>

            <hr>

            <p>
                We appreciate your trust in LearnSphere and wish you a successful
                learning journey.
            </p>

        </div>

        <div class="footer">

            Need help?

            <br><br>

            Contact us at

            <a href="mailto:kk.kaifkhan05@gmail.com">
                kk.kaifkhan05@gmail.com
            </a>

            <br><br>

            © ${new Date().getFullYear()} LearnSphere. All rights reserved.

            <br><br>

            This is an automated email. Please do not reply directly to this email.

        </div>

    </div>

</body>

</html>`;
};