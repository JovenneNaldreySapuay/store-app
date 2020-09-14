const nodemailer = require('nodemailer');

const from = '"Shopeeh" <hello@shopeeh.com>';

function setup() {
	return nodemailer.createTransport({
	  host: process.env.EMAIL_HOST,
	  port: process.env.EMAIL_PORT,
	  auth: {
	    user: process.env.EMAIL_USER,
	    pass: process.env.EMAIL_PASS
	  },
	  tls:{
      	rejectUnauthorized:false
      }
	});
}

const sendConfirmationEmail = (user) => {
	const transport = setup();

	const email = {
		from,
		to: user.email,
		subject: "Shopeeh Email Confirmation",
		text: `Please confirm your email by copy and pasting the link below into your browser
		${user.generateConfirmationUrl()}`
	}

	transport.sendMail(email);
}

const sendResetPasswordEmail = (user) => {
	const transport = setup();

	const email = {
		from,
		to: user.email,
		subject: "Reset Your Password",
		text: `
		To reset your password click this link

		${user.generateResetPasswordLink()}
		`
	}

	transport.sendMail(email);
}

module.exports = { sendConfirmationEmail, sendResetPasswordEmail }