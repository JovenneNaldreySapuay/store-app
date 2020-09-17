import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';
import InlineError from './InlineError';

class ResetPasswordForm extends Component {
	state = {
		data: {
			token: this.props.token,
			password: '',
			passwordConfirmation: ''
		},
		loading: false,
		errors: {}
	};

	onSubmit = (e) => {
		e.preventDefault();
		
		const errors = this.validate(this.state.data);
		
		this.setState({ errors });

		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props
				.submit(this.state.data)
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
		}
	}

	onChange = e => 
		this.setState({ 
			...this.state, 
			data: { ...this.state.data, [e.target.name]: e.target.value } 
		});

	validate = (data) => {
		const errors = {};

		if (!data.password) errors.password = "Can't be blank";
		if (data.password !== data.passwordConfirmation) errors.password = "Password must match";

		return errors;
	};

	render() {
		const { data, loading, errors } = this.state;

		return (
			<Form onSubmit={this.onSubmit} loading={loading} className="border border-gray-400 p-4 rounded">
				
				{!!errors.global && <Message negative>{errors.global}</Message>}

				<Form.Field error={!!errors.password}>
					<label htmlFor="password" className="text-gray-600">New Password</label>
					<input 
						className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
						type="password" 
						id="password" 
						name="password" 
						placeholder="Your new password"
						value={data.password} 
						onChange={this.onChange} 
					/>
					{errors.password && <InlineError text={errors.password} />}
				</Form.Field>
				<Form.Field error={!!errors.passwordConfirmation}>
					<label htmlFor="passwordConfirmation" className="text-gray-600">Confirm Password</label>
					<input 
						className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
						type="password" 
						id="passwordConfirmation" 
						name="passwordConfirmation" 
						placeholder="Type it again"
						value={data.passwordConfirmation} 
						onChange={this.onChange} 
					/>
					{errors.passwordConfirmation && <InlineError text={errors.passwordConfirmation} />}
				</Form.Field>
				<button 
				className="btn block w-full mt-3"
				>RESET
				</button>				
			</Form> 
	);
	}
}

export default ResetPasswordForm;