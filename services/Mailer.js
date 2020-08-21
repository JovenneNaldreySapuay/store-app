const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

// https://mailtrap.io use Gmail acct
class Mailer extends helper.Mail {
	constructor( { subject, recipients }, content ) {
		super();

		this.sgApi = sendgrid(keys.sendGridKey); 
		this.from_email = new helper.Email('no-reply@email.com');
		this.subject = 'Test Email';
		this.body = new helper.Content('text/html', content);
		this.recipients = 'jovenneregs@gmail.com'; // this.formatAddresses(recipients);	
		
		this.addContent(this.body); // method provided by helper.Mail class
		this.addClickTracking();
		this.addRecipients();
	}

	formatAddresses(recipients) {
		return recipients.map(({ email }) => {
			return new helper.Email(email);
		});
	}

	addClickTracking() {
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}

	addRecipients() {
		const personalize = new helper.Personalization();
		
		// this.recipients.forEach(recipient => {
		// 	personalize.addTo(recipient);
		// });

		this.addPersonalization(personalize);
	}

	async send() {
		const request = this.sgApi.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON()
		});

		const response = await this.sgApi.API(request);
		return response;
	}
}

module.exports = Mailer;



