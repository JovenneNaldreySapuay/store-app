import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import InlineError from './InlineError';
import SideBar from './SideBar';
import { 
updateUser, 
fetchUser 
} from '../actions';

class ResetPassword extends Component {
	state = {
		data: {
			id: this.props.user.id,
			password: ''
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
			const { 
				id, 
				password
			} = this.state.data;

			const userInfo = { 
				id, 
				password
			};

			alert(userInfo.id + ' ' + userInfo.password);

			this.setState({ loading: true });
			
			this.props.updateUser( userInfo );
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

		const { password, passwordagain  } = this.state.data;

    	if (! password) errors.password = "Password is required";
    	if (! passwordagain) errors.passwordagain = "Retype Password is required";

		return errors;
	};

	render() {
		// console.log("ResetPassword", this.props );
		const { data, loading, errors } = this.state;
	
		return (
		<React.Fragment>
			<div className="bg-gray-200 border-r w-64 h-screen absolute top-0 left-0 overflow-y-scroll">
				<SideBar />
			</div>

			<div className="w-full bg-white mt-3 pl-64">
				<div className="p-4 text-sm text-gray-800">
					<h1 className="text-4xl text-gray-700 font-bold leading-none mb-8">Update Password</h1> 

					<Form onSubmit={this.handleOnSubmit} loading={loading}>
						<Form.Field error={!!errors.password}>
							<label htmlFor="password" className="text-gray-600 pb-1 block">New Password</label>
							<input 
								className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
								type="password" 
								id="password" 
								name="password" 
								placeholder="Make it secure" 
								value={data.password} 
								onChange={this.handleOnChange} 
							/>
							{errors.password && <InlineError text={errors.password} />}
						</Form.Field>
						<Form.Field error={!!errors.passwordagain}>
							<label htmlFor="password2" className="text-gray-600 pb-1 block">Retype Password</label>
							<input 
								className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
								type="password" 
								id="password2" 
								name="passwordagain" 
								placeholder="Retype password" 
								value={data.passwordagain} 
								onChange={this.handleOnChange} 
							/>
							{errors.passwordagain && <InlineError text={errors.passwordagain} />}
						</Form.Field>
						
						<button className="bg-blue-500 inline-block w-32 text-white p-2 rounded mt-3 text-center">Save Changes</button>
						
						<Link to="/profile" className="bg-transparent border border-gray-700 inline-block w-16 text-gray-700 p-2 rounded ml-2 mt-3 text-center">Cancel</Link>
					</Form> 	
				</div>
			</div>
		</React.Fragment>
	);
	}
}

function mapStateToProps(state, ownProps) {
	// console.log("ResetPassword", state );
	return {
		user: state.auth
	};
}

export default connect(mapStateToProps, { updateUser, fetchUser })(ResetPassword);