import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import InlineError from './InlineError';

class SendEmail extends Component {
	state = {
		data: {
			email: '',
			password: ''
		},
		loading: false,
		errors: {}
	};

	onSubmit = (e) => {
		e.preventDefault();
		
		const errors = this.validate(this.state.data);
		
		// console.log("Errors found", errors );

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
		if (!data.password) errors.password = "Can't be blank";

		return errors;
	};

	render() {
		const { data, loading, errors } = this.state;
		// console.log("SendEmail", this.props );
		return (
			<Form onSubmit={this.onSubmit} loading={loading}>
				<Form.Field error={!!errors.email}>
					<label htmlFor="email">Email</label>
					<input 
						type="email" 
						id="email" 
						name="email" 
						placeholder="email@email.com"
						autoComplete="email"
						value={data.email} 
						onChange={this.onChange} 
					/>
					{errors.email && <InlineError text={errors.email} />}
				</Form.Field>
				<Form.Field error={!!errors.password}>
					<label htmlFor="password">Password</label>
					<input 
						type="password" 
						id="password" 
						name="password" 
						placeholder="Make it secure" 
						autoComplete="current-password"
						value={data.password} 
						onChange={this.onChange} 
					/>
					{errors.password && <InlineError text={errors.password} />}
				</Form.Field>
				<Button primary>Send Email</Button>		
			</Form> 
	);
	}
}

export default SendEmail;