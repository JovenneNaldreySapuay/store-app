const nodemailer = require('nodemailer');
const keys = require('./config/keys');

const from = '"Blogly" <hello@blogly.com>';

// FOR PRODUCTION
function setup() {
	return nodemailer.createTransport({
	  host: keys.emailHost,
	  port: keys.emailPort,
	  auth: {
	    user: keys.emailUser,
	    pass: keys.emailPass
	  },
	  tls:{
      	rejectUnauthorized:false
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

module.exports = sendConfirmationEmail = (user) => {
	const transport = setup();

	const email = {
		from,
		to: user.email,
		subject: "Blogly email confirmation",
		text: `Please confirm your email by copy and pasting the link below into your browser
		${user.generateConfirmationUrl()}`
	}

	transport.sendMail(email);
}