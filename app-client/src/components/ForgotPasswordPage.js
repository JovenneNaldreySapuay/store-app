import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import ForgotPasswordForm from './ForgotPasswordForm';
import { resetPasswordRequest } from '../actions/auth';

class ForgotPasswordPage extends Component {
	state = {
		success: false
	};

	submit = data => 
		this.props
			.resetPasswordRequest(data)
			.then(() => this.setState({ success: true }));

	render() {
		return (
			<div className="container mx-auto w-full max-w-md h-screen">
				<h2 className="text-center py-5 font-bold">Reset your password</h2>
				{this.state.success ? <Message>Email has been sent.</Message> : <ForgotPasswordForm submit={this.submit}/>}
			</div>

		); 
	}
}

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);