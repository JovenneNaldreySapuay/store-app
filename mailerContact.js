const nodemailer = require('nodemailer');
const keys = require('./config/keys');

// const from = '"Bookworm" <info@bookworm.com>';

// FOR PRODUCTION
function setup() {
	return nodemailer.createTransport({
	  host: keys.emailHost,
	  port: keys.emailPort,
	  auth: {
	    user: keys.emailUser,
	    pass: keys.emailPass
	  },
	  tls: {
      	rejectUnauthorized: false
      }
	});
}

module.exports = sendEmail = (formData) => {
	const transport = setup();

	const mailOptions = {
		from: formData.email, 
		to: formData.email, 
		subject: "Website Leads Message",
		text: `
			Company: ${formData.company}
			Phone: ${formData.phone}
			Message: ${formData.message}
		`
	}

	transport.sendMail(mailOptions, (error, info) => {
		if (error) { return console.log(error);	}

		console.log('Message sent: %s', info.messageId);   
		// console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		// res.render('ContactForm', {msg:'Email has been sent'});
	});
}