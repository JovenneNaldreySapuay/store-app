const nodemailer = require('nodemailer');
const keys = require('./config/keys');

const from = '"Shopeeh" <hello@shopeeh.com>';

function setup() {
	return nodemailer.createTransport({
	  host: keys.emailHost,
	  port: keys.emailPort,
	  auth: {
	    user: keys.emailUser,
	    pass: keys.emailPass
	  }
	});
}

// function setup() {
// 	return nodemailer.createTransport({
// 	  host: process.env.EMAIL_HOST,
// 	  port: process.env.EMAIL_PORT,
// 	  auth: {
// 	    user: process.env.EMAIL_USER,
// 	    pass: process.env.EMAIL_PASS
// 	  }
// 	});
// }

module.exports = sendResetPasswordEmail = (user) => {
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
