import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import InlineError from './InlineError';

import { 
	updateUser, 
	fetchUser } from '../actions/user';

class ProfileForm extends Component {
	state = {
		data: {
			_id: '',
			fullName: '',
			email: '',
			role: '',
			phone: '',
			address: '',
			city: '',
			province: '',
			country: '',
			zipcode: '',
		},
		loading: false,
		redirect: false,
		errors: {}
	};

	handleOnSubmit = async (e) => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });

		const isValid = Object.keys(errors).length === 0;

		if (isValid) { 

			const { 
				_id,
				fullName,
				email,
				role,
				phone,
				address,
				city,
				province,
				country,
				zipcode,
			} = this.state.data;

			const user = { 
				_id,
				fullName,
				email,
				role,
				phone,
				address,
				city,
				province,
				country,
				zipcode,
			};
			
			console.log("Updated User", user);
			
			this.props.updateUser(user);

			this.setState({ 
				loading: true, 
				redirect: true 
			});
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
	
	componentDidMount() {
		const { _id } = this.props.match.params;
		if (_id) {
			this.props.fetchUser(_id);
		}
	}

	static getDerivedStateFromProps(props, state) {
		if (props.user._id !== state.data._id) {

			const { 
				_id, 
				fullName, 
				email, 
				role,
				phone,
				address,
				city,
				province,
				country,
				zipcode 
			} = props.user;
			
			return {
				data: {
		        	_id,
		        	fullName,
		        	email,
		        	role,
		        	phone,
					address,
					city,
					province,
					country,
					zipcode,
		    	}
			}
		}

		return null;
	}

	validate = (data) => {
		const errors = {};

		const { fullName, phone, address, city, province, country, zipcode, } = this.state.data;

    	if (! fullName) errors.fullName = "Full Name is required";
    	if (! phone) errors.phone = "Phone is required";
    	if (! address) errors.address = "Address is required";
    	if (! city) errors.city = "City is required";
    	if (! province) errors.province = "Province is required";
    	if (! country) errors.country = "Country is required";
    	if (! zipcode) errors.zipcode = "Zip Code is required";
    	
		return errors;
	};

	render() {
		const { user } = this.props;

		const { 
			loading, 
			errors, 
			redirect, 
			data: {
				fullName,
				email,
				phone,
				address,
				city,
				province,
				country,
				zipcode
			} 
		} = this.state;

		if (! user) {
			return (
				<div>Loading...</div>
			)
		}
		
		return (
		<React.Fragment>
			<div className="w-full bg-white mt-3 pl-64">
				<div className="p-4 text-sm text-gray-800">
				<h1 className="text-4xl text-gray-700 font-bold leading-none mb-8">
				Edit Profile
				</h1> 

				<Form onSubmit={this.handleOnSubmit} loading={loading}>
					<Form.Field error={!!errors.email}>
						<label htmlFor="email" className="text-gray-600 pb-1 block">Email</label>
						<input
							className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
							type="email" 
							id="email" 
							name="email" 
							value={email || ""} 
							readOnly
						/>
						<p className="text-red-400 mb-2">Email can't be changed</p>
						{errors.email && <InlineError text={errors.email} />}
					</Form.Field>
					<hr />
					<Form.Field error={!!errors.fullName}>
						<label htmlFor="fullName" className="text-gray-600 pb-1 block">Full Name</label>
						<input 
							className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
							type="text" 
							id="fullName" 
							name="fullName" 
							placeholder="Jane Doe"
							value={fullName || ""} 
							onChange={this.handleOnChange} 
						/>
						{errors.fullName && <InlineError text={errors.fullName} />}
					</Form.Field>

					<Form.Field error={!!errors.phone}>
						<label htmlFor="phone" className="text-gray-600 pb-1 block">Phone</label>
						<input 
							className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
							type="text" 
							id="phone" 
							name="phone" 
							placeholder="Enter your phone #"
							value={phone || ""} 
							onChange={this.handleOnChange} 
						/>
						{errors.phone && <InlineError text={errors.phone} />}
					</Form.Field>

					<Form.Field error={!!errors.address}>
						<label htmlFor="address" className="text-gray-600 pb-1 block">Address</label>
						<input 
							className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
							type="text" 
							id="address" 
							name="address" 
							placeholder="Enter your home address"
							value={address || ""} 
							onChange={this.handleOnChange} 
						/>
						{errors.address && <InlineError text={errors.address} />}
					</Form.Field>

					<Form.Field error={!!errors.city}>
						<label htmlFor="city" className="text-gray-600 pb-1 block">City</label>
						<input 
							className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
							type="text" 
							id="city" 
							name="city" 
							placeholder="Enter your city"
							value={city || ""} 
							onChange={this.handleOnChange} 
						/>
						{errors.city && <InlineError text={errors.city} />}
					</Form.Field>

					<Form.Field error={!!errors.province}>
						<label htmlFor="province" className="text-gray-600 pb-1 block">Province</label>
						<input 
							className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
							type="text" 
							id="province" 
							name="province" 
							placeholder="Enter your province"
							value={province || ""} 
							onChange={this.handleOnChange} 
						/>
						{errors.province && <InlineError text={errors.province} />}
					</Form.Field>

					<Form.Field error={!!errors.country}>
						<label htmlFor="country" className="text-gray-600 pb-1 block">Country</label>
						<input 
							className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
							type="text" 
							id="country" 
							name="country" 
							placeholder="Enter your country"
							value={country || ""} 
							onChange={this.handleOnChange} 
						/>
						{errors.country && <InlineError text={errors.country} />}
					</Form.Field>

					<Form.Field error={!!errors.zipcode}>
						<label htmlFor="zipcode" className="text-gray-600 pb-1 block">Zip Code</label>
						<input 
							className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
							type="text" 
							id="zipcode" 
							name="zipcode" 
							placeholder="Enter your zipcode"
							value={zipcode || ""} 
							onChange={this.handleOnChange} 
						/>
						{errors.zipcode && <InlineError text={errors.zipcode} />}
					</Form.Field>

					
					<button 
					className="bg-blue-500 inline-block w-32 text-white p-2 rounded mt-3 text-center">
						Save Changes
					</button>
					
					<Link to="/account" className="bg-transparent border border-gray-700 inline-block w-16 text-gray-700 p-2 rounded ml-2 mt-3 text-center">Cancel</Link>
				</Form> 
				{ redirect && (<Redirect to="/account" />) }					
				</div>
			</div>
		</React.Fragment>
	);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { _id } = ownProps.match.params;

	return {
		userId: _id,
		user: state.user.item
	}
};

export default connect(mapStateToProps, { fetchUser, updateUser })(ProfileForm);