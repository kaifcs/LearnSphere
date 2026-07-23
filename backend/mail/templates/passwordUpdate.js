exports.passwordUpdated = (email, name) => {
  return `<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Your LearnSphere Password Was Updated</title>

    <style>
        body {
            background-color: #ffffff;
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.4;
            color: #333333;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }

        .logo {
            max-width: 200px;
            margin-bottom: 20px;
        }

        .message {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .body {
            font-size: 16px;
            margin-bottom: 20px;
        }

        .support {
            font-size: 14px;
            color: #999999;
            margin-top: 20px;
        }

        .highlight {
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div class="container">

        <a href="https://learnsphere.vercel.app">
            <img
                class="logo"
                src="https://i.ibb.co/7Xyj3PC/logo.png"
                alt="LearnSphere Logo"
            />
        </a>

        <div class="message">
            🔒 Your Password Has Been Updated
        </div>

        <div class="body">
            <p>Dear ${name},</p>

            <p>
                Your LearnSphere account password has been successfully updated
                for
                <span class="highlight">${email}</span>.
            </p>

            <p>
                If you did not request this password change, please contact us
                immediately at
                <a href="mailto:kk.kaifkhan05@gmail.com">
                    kk.kaifkhan05@gmail.com
                </a>
                to help secure your account.
            </p>
        </div>

        <div class="support">
            If you have any questions or need further assistance, please contact us at
            <a href="mailto:kk.kaifkhan05@gmail.com">
                kk.kaifkhan05@gmail.com
            </a>.
            <br /><br />
            Thank you for choosing LearnSphere. Stay safe and happy learning!
        </div>

    </div>
</body>

</html>`;
};