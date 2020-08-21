import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendmail } from '../actions/users';
import SendEmail from './SendEmail';

class SendEmailPage extends Component {
	submit = data => this.props.sendmail(data).then(() => this.props.history.push("/dashboard"))

	render() {
		return (
			<div>
				<h1>Send Email</h1>

				<SendEmail submit={this.submit} />
			</div>

		); 
	}
}

export default connect(null, { sendmail })(SendEmailPage);

