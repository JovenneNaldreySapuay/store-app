const nodemailer = require('nodemailer');
const keys = require('./config/keys');

const from = '"Bookworm" <info@bookworm.com>';

// FOR PRODUCTION
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

// Not needed since the code above is OK 
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
		To reset password follow this link

		${user.generateResetPasswordLink()}
		`
	}

	transport.sendMail(email);
}

