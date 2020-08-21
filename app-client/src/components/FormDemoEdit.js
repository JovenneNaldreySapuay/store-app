import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchForm } from '../actions/form';

class FormDemoEdit extends Component {
	state = {
		_id: '',
		assets: [],
		category: '',
		gender: '',
	};

	componentDidMount() {
		const { id } = this.props;

		if (id) {
			this.props.fetchForm(id);
		}
	}

	handleOnSubmit = (e) => {
		e.preventDefault()

		// const data = {
		// 	gender: 
		// }

		console.log("Submit state:", this.state);
	}

	// handleOnChange = (e) => {
	// 	this.setState(
	// 		(prevState, props) => {
	// 			return { 
	// 				gender: prevState.gender 
	// 			}
	// 		}
	// 	)
	// }

	handleOnChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	static getDerivedStateFromProps(props, state) {
		if (props.form._id !== state._id) {
			console.log("props", props);

			const { _id, assets, gender, category } = props.form;
			
			return {
	        	_id,
	        	assets,
	        	gender,
	        	category    	
			}
		}

		return null;
	}

	render() {
		console.log("FormDemoEdit", this.props);

		const { gender } = this.state;

		// console.log("Current State:", this.state);

		return (
			<div style={{ width: 400, margin: '0 auto', padding: 15 }}>
			
			<h1 className="text-center text-blue-600 mb-5 uppercase">Edit Form</h1>
			
			<form onSubmit={this.handleOnSubmit}>
				<p className="text-red-400 mb-1">Select Gender</p>
				<div 
				className="border border-grey-200 mb-5 p-2">
					
					<input 
					type="radio" 
					id="male" 
					name="gender" 
					value={gender === "male" ? "male" : ""}
					defaultChecked={gender === "male"}
					onChange={this.handleOnChange}
					/>{' '}
					<label htmlFor="male">Male</label>{' '}
					
					<input 
					type="radio" 
					id="female" 
					name="gender" 
					value={gender === "female" ? "female" : ""}
					defaultChecked={gender === "female"}
					onChange={this.handleOnChange}
					/>{' '}
					<label htmlFor="female">Female</label>
				</div>

				<p className="text-red-400 mb-1">Select Assets</p>
				<div className="border border-grey-200 mb-5 p-2">
					<input 
					type="checkbox" 
					id="bike"
					name="asset" 
					value="bike"
					/>{' '}
					<label htmlFor="bike">
					Bike
					</label>{' '}

					<input 
					type="checkbox" 
					id="car"
					name="asset" 
					value="car"
					/>{' '}
					<label htmlFor="car">
					Car
					</label>{' '}

					<input 
					type="checkbox" 
					id="plane"
					name="asset" 
					value="plane"
					/>{' '}
					<label htmlFor="plane">
					Plane
					</label>
				</div>
				
				<p className="text-red-400 mb-1">Select Category</p>
				<div className="border border-grey-200 mb-5 p-2">
					<select name="categories" id="categories">
						<option value="men">Men</option>
						<option value="women">Women</option>
					</select>
				</div>
				
				<div>
					<button 
					className="bg-blue-500 text-white py-1 px-2 mt-2"
					type="submit">Save Changes</button>	
				</div>
			</form>
			</div>
		); 
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		id: ownProps.match.params._id,
		form: state.form.item
	};
}

export default connect(mapStateToProps, { fetchForm })(FormDemoEdit);