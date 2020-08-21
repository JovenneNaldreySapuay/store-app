import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SideBar from '../SideBar';
import { 
	updateUser, 
	fetchUser } from '../../actions/user';

class EditRole extends Component {

	state = {
		data: {
			_id: this.props.match.params ? this.props.match.params._id : '',
			role: ''
		},
		loading: false,
		redirect: false,
		errors: {}
	};
	
	
	componentDidMount = () => {
		const { _id } = this.props.match.params;
		
		if (_id) {
			this.props.fetchUser(_id);
		}
	}
	

	handleOnSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
	    this.setState({ errors });
		const isValid = Object.keys(errors).length === 0;
						
		if (isValid) { 
			const info = {
				_id: this.state.data._id,
				fullName: this.props.user.fullName,
				email: this.props.user.email,
				role: this.state.data.role,
			};
				
			this.props.updateUser(info);
			this.setState({ loading: true, redirect: true });
		}
	};

	
	handleOnChange = (e) => {

		if (!!this.state.errors[e.target.name]) {

			let errors = Object.assign({}, this.state.errors);
					
			delete errors[e.target.name];

			this.setState({ 
				errors, 
				data: {
					...this.state.data,
					role: e.target.value
				}
			});
		} else {
			this.setState({ 
				data: {
					...this.state.data,
					role: e.target.value
				}
			});
		}
	}

	validate = (values) => {
    	const errors = {};
    	if (!this.state.data.role) errors.role = "Please select a role.";
    	return errors;
  	};

  	
	render() {
	    const { loading, redirect, errors } = this.state;
	    const { user } = this.props;
	  	
		const InlineError = ({ text }) => (
			<span style={{ color: "#ae5856" }}>{text}</span>
		);

		if (!this.props.user) {
			return <div>{ loading }</div>;
		}

		return (
		 	<React.Fragment>
		 		<div className="bg-gray-200 border-r w-64 h-screen absolute top-0 left-0 overflow-y-scroll">
					<SideBar />
		 		</div>

		 		<div className="w-full bg-white mt-3 pl-64">
					<div className="p-4 text-sm text-gray-800">
						<h1 className="text-4xl text-gray-700 font-bold leading-none mb-8">Change User Role</h1> 
					
						<Form onSubmit={ this.handleOnSubmit } loading={ loading }>
						<Form.Field>
						<label htmlFor="email" className="text-gray-600 pb-1 block">Email</label>
						<input 
						className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
						type="email" 
						name="email" 
						value={user.email || ""}
						id="email"
						readOnly
						/>
						</Form.Field>
						
						<Form.Field>
						<label htmlFor="fullName" className="text-gray-600 pb-1 block">Full Name</label>
						<input 
						className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
						type="text" 
						name="fullName" 
						value={user.fullName || ""}
						id="fullName"
						readOnly
						/>
						</Form.Field>

						<Form.Field>
						<label htmlFor="role" className="text-gray-600 pb-1 block">Current Role</label>
						<input
						className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
						type="text" 
						name="role" 
						value={user.role || ""}
						id="role"
						readOnly
						/>
						</Form.Field>

						<Form.Field>
						<label htmlFor="role" className="text-gray-600 pb-1 block">Select New Role</label>
						<select 
						className="block w-full border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight bg-gray-300"
						name="role"
						id="role"
						onChange={this.handleOnChange}
						>
						<option value="select">Select a role</option> 
						<option value="user">User</option> 
						<option value="admin">Admin</option>
						<option value="demo_admin">Demo Admin</option>
						<option value="demo_user">Demo User</option>
						</select>  
						{errors.role && <InlineError text={errors.role} />}
						</Form.Field>
						

						<button className="bg-blue-500 inline-block w-32 text-white p-2 rounded mt-3 text-center">Save Changes</button>
						<Link to="/users" className="bg-transparent border border-gray-700 inline-block w-16 text-gray-700 p-2 rounded ml-2 mt-3 text-center">Cancel</Link>
						</Form>
						{ redirect && (<Redirect to="/users" />) }
		 			</div>
		 		</div>
		 	</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user.item
});

export default connect(mapStateToProps, { updateUser, fetchUser })(EditRole);