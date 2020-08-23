import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginForm from './LoginForm';
import { login } from '../../actions/auth';
		
class LoginPage extends Component {

	submit = (data) => this.props.login(data).then(() => this.props.history.push("/shop"));

	render() {
		// console.log("LoginPage", this.props );
	
		return (	
			<div className="container mx-auto w-full max-w-md">
				<h2 className="text-center py-5 font-bold">Log-in to your account</h2>
				<LoginForm submit={this.submit} />
			</div>
		); 	
	}
};

LoginPage.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);
