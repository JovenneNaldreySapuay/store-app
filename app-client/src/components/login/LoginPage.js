import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginForm from './LoginForm';
import { login } from '../../actions/auth';
		
class LoginPage extends Component {

	submit = (data) => this.props.login(data).then(() => this.props.history.push("/"));

	render() {
		// console.log("LoginPage", this.props );
		// const demo_email = process.env.REACT_APP_USER_EMAIL;
		// const demo_pass = process.env.REACT_APP_USER_PASSWORD;
		// console.log(demo_email, demo_pass);
	
		return (	
			<div className="container mx-auto w-full max-w-md h-screen">
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
