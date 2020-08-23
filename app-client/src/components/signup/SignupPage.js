import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/user';

import SignupForm from './SignupForm';

class SignupPage extends Component {
	submit = (data) => this.props.signup(data).then(() => this.props.history.push("/dashboard"))

	render() {
		return (
			<div className="container mx-auto w-full max-w-md">
				<h2 className="text-center py-5 font-bold">Create your account</h2>
				<SignupForm submit={this.submit} />
			</div>			
		); 
	}
}

export default connect(null, { signup })(SignupPage);

