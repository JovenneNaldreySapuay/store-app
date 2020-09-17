import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import InlineError from './InlineError';

class ForgotPasswordForm extends Component {
	state = {
		data: {
			email: ''
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
				.catch(err => 
					this.setState({ errors: err.response.data.errors, loading: false })
				);
		}
	}

	onChange = e => 
		this.setState({ 
			...this.state, 
			data: { ...this.state.data, [e.target.name]: e.target.value } 
		});

	validate = data => {
		const errors = {};

		if (!isEmail(data.email)) errors.email = "Invalid email";

		return errors;
	};

	render() {
		const { data, loading, errors } = this.state;

		return (
			<Form onSubmit={this.onSubmit} loading={loading} className="border border-gray-400 p-4 rounded mx-4">
				
				{!!errors.global && <Message negative>{errors.global}</Message>}

				<Form.Field error={!!errors.email}>
					<label htmlFor="email" className="text-gray-600">Email</label>
					<input
						className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
						type="email" 
						id="email" 
						name="email" 
						placeholder="jane@email.com"
						autoComplete="email"
						value={data.email} 
						onChange={this.onChange} 
					/>
					{errors.email && <InlineError text={errors.email} />}
				</Form.Field>
					
				<button 
				className="btn block w-full mt-3"
				>RESET
				</button>
			</Form> 
	);
	}
}

export default ForgotPasswordForm;