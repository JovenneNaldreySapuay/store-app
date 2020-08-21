import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

import ResetPasswordForm from './ResetPasswordForm';
import { validateToken, resetPassword } from '../actions/auth';

class ResetPasswordPage extends Component {
	state = {
		loading: true,
		success: false
	};

	componentDidMount() {
		this.props
			.validateToken(this.props.match.params.token)
			.then(() => this.setState({ loading: false, success: true }))
			.catch(() => this.setState({ loading: false, success: false }));
	}

	submit = (data) => this.props.resetPassword(data).then(() => this.props.history.push("/login"))

	render() {
		const { loading, success } = this.state;
		const token = this.props.match.params.token;

		return (
			<div className="container mx-auto w-full max-w-md">
				<h2 className="text-center py-5 font-bold">Reset your password</h2>
				{ loading && <Message>Loading...</Message> }	
				{ !loading && success && <ResetPasswordForm submit={this.submit} token={token} /> }
				{ !loading && !success && <Message>Invalid Token</Message> }
			</div>
		); 
	}
}

export default connect(null, { validateToken, resetPassword })(ResetPasswordPage);