exports.courseEnrollmentEmail = (courseName, name) => {
    return `<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Welcome to LearnSphere!</title>

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

        .cta {
            display: inline-block;
            padding: 10px 20px;
            background-color: #FFD60A;
            color: #000000;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
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
            🎉 You're Successfully Enrolled!
        </div>

        <div class="body">
            <p>Dear ${name},</p>

            <p>
                You have successfully enrolled in the course
                <span class="highlight">"${courseName}"</span>.
                We are excited to have you as a learner!
            </p>

            <p>
                Log in to your LearnSphere dashboard to access your course
                materials and begin learning today.
            </p>

            <p>
                We hope you enjoy learning with LearnSphere. Happy learning!
            </p>

            <a
                class="cta"
                href="https://learnsphere.vercel.app/dashboard/enrolled-courses"
            >
                Start Learning
            </a>
        </div>

        <div class="support">
            If you have any questions or need assistance, please feel free to
            reach out to us at
            <a href="mailto:kk.kaifkhan05@gmail.com">
                kk.kaifkhan05@gmail.com
            </a>.
            We are here to help!
            <br /><br />
            Thank you for choosing LearnSphere. We wish you a rewarding learning journey!
        </div>

    </div>
</body>

</html>`;
};