import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import isEmail from 'validator/lib/isEmail';

import InlineError from '../InlineError';
import { signup } from '../../actions/user';

class SignupForm extends Component {
	state = {
		data: {
			email: '',
			password: '',
			fullName: ''
		},
		loading: false,
		errors: {}
	};

	handleOnSubmit = async (e) => {
		e.preventDefault();
		
		const errors = this.validate(this.state.data);
	
		this.setState({ errors });

		const isValid = Object.keys(errors).length === 0;

		if (isValid) { 
			const { data } = this.state;

			const userInfo = {
				email: data.email,
				password: data.password,
				fullName: data.fullName
			};

			this.setState({ loading: true });
			
			this.props
			.submit(userInfo)
			.catch(err => 
			this.setState({ errors: err.response.data.errors, loading: false })
			);
		}
	}

	handleOnChange = (e) => {
		if (!!this.state.errors[e.target.name]) {

			let errors = Object.assign({}, this.state.errors);
					
			delete errors[e.target.name];

			this.setState({
				errors,
				data: {
					...this.state.data,
					[e.target.name]: e.target.value
				}
			});
		} else {
			this.setState({ 
				data: {
					...this.state.data,
					[e.target.name]: e.target.value
				}
			});
		}
	};

	validate = (data) => {
		const errors = {};

		const { email, password, fullName } = this.state.data;

    	if (! email) errors.email = "Email is required";
    	if (! password) errors.password = "Password is required";
    	if (! fullName) errors.fullName = "Full Name is required";

		return errors;
	};

	render() {
		const { 
			data, 
			loading, 
			errors 
		} = this.state;
		
		return (
			<Form onSubmit={this.handleOnSubmit} loading={loading} className="border border-gray-400 p-4 rounded">
				<Form.Field error={!!errors.fullName}>
					<label htmlFor="fullName" className="text-gray-600">Full Name</label>
					<input
						className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
						type="text" 
						id="fullName" 
						name="fullName" 
						placeholder="Enter your name"
						value={data.fullName} 
						onChange={this.handleOnChange} 
					/>
					{errors.fullName && <InlineError text={errors.fullName} />}
				</Form.Field>
				<Form.Field error={!!errors.email} className="mt-1">
					<label htmlFor="email" className="text-gray-600">Email</label>
					<input
						className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
						type="email" 
						id="email" 
						name="email" 
						placeholder="Enter your email"
						value={data.email} 
						onChange={this.handleOnChange} 
					/>
					{errors.email && <InlineError text={errors.email} />}
				</Form.Field>
				<Form.Field error={!!errors.password} className="mt-1">
					<label htmlFor="password" className="text-gray-600">Password</label>
					<input 
						className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
						type="password" 
						id="password" 
						name="password" 
						placeholder="Enter your password" 
						value={data.password} 
						onChange={this.handleOnChange} 
					/>
					{errors.password && <InlineError text={errors.password} />}
				</Form.Field>
				
				<button className="bg-blue-500 block w-full text-white p-1 rounded mt-3">SIGN UP</button>				
				
				<Message className="mt-2 text-center">
					<div>Got an account? <Link to="/login" className="text-blue-500 underline">Login</Link></div>
				</Message>
			</Form> 
	);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(mapStateToProps, { signup })(SignupForm);