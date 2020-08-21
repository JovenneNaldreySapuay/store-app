import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Validator from 'validator';
import { 
	Form,  
	Message, 
} from 'semantic-ui-react';

import InlineError from './InlineError';

class LoginForm extends Component {
	state = {
		data: {
			email: 'jovenne@test.com',
			password: 'admin'
		},
		loading: false,
		errors: {}
	};

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
				data: { ...this.state.data, [e.target.name]: e.target.value } 
			});
		}
	}

	handleOnSubmit = (e) => {

		e.preventDefault();

		const errors = this.validate(this.state.data);
		
		this.setState({ errors });

		// const isValid = Object.keys(errors).length === 0;

		// console.log("errors", errors);

		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props
				.submit(this.state.data)
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
		}
	};

	validate = (data) => {
		// TODO: Validation not complete
		// see this - https://github.com/Remchi/reddice/tree/master/client/components
		// When entering wrong password it loads and redirect to home route - FIXED

		const errors = {};

    	const { email, password } = this.state.data;

		if (! Validator.isEmail(email)) errors.email = "Can't be blank";
		// Tuts: https://www.youtube.com/watch?v=JiFCwo3iBuk
		// TODO: fetch password in the DB and compare
		// Below checks only if pw is empty and doesn't compare
		if (! password) errors.password = "Can't be blank";

		return errors;
	};

	render() {
		const { data, errors, loading } = this.state;
		
		// console.log("Global error:", errors.global);

		return (
			<Form onSubmit={this.handleOnSubmit} loading={loading} className="border border-gray-400 p-4 rounded">

				{!!errors.global && <Message className="text-red-400">{errors.global}</Message>}

				<Form.Field error={!!errors.email}>
					<label htmlFor="email" className="text-gray-600">Email</label>
					<input
						className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
						type="email" 
						id="email" 
						name="email" 
						placeholder="Enter your email"
						autoComplete="email" 
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
						autoComplete="current-password"
						value={data.password}
						onChange={this.handleOnChange} 
					/>
					{errors.password && <InlineError text={errors.password} />}
				</Form.Field>
				<button className="bg-blue-500 block w-full text-white p-1 rounded mt-3">LOG IN</button>
				<Message className="mt-2 text-center">
					<div>Forgot your Password? <Link to="/forgot_password" className="text-blue-500 underline">Reset</Link></div>
					<div>New here? <Link to="/signup" className="text-blue-500 underline">Sign Up</Link></div>
					{/* <div>Sign in as a <Link to="/demo" className="text-blue-500 underline">Demo User</Link></div> */}
				</Message>
			</Form>

		); 
	}
}

export default LoginForm;

