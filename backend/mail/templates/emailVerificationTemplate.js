const otpTemplate = (otp, name) => {
	return `<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>Verify Your LearnSphere Account</title>

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
			Verify Your LearnSphere Account
		</div>

		<div class="body">
			<p>Dear ${name},</p>

			<p>
				Thank you for registering with LearnSphere. To complete your
				registration, please use the following OTP (One-Time Password)
				to verify your account:
			</p>

			<h2 class="highlight" style="letter-spacing:4px;">
				${otp}
			</h2>

			<p>
				This OTP is valid for the next <strong>3 minutes</strong>.
				If you did not request this verification, you can safely ignore
				this email. Once your account is verified, you'll have full
				access to LearnSphere and all its features.
			</p>
		</div>

		<div class="support">
			If you have any questions or need assistance, please feel free to
			reach out to us at
			<a href="mailto:kk.kaifkhan05@gmail.com">
				kk.kaifkhan05@gmail.com
			</a>.
			We are here to help!
		</div>

	</div>
</body>

</html>`;
};

module.exports = otpTemplate;