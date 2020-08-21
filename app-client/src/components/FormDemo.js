import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchForms } from '../actions/form';

class FormDemo extends Component {

	componentDidMount() {
		this.props.fetchForms();
	}

	render() {
		// console.log("FormDemo", this.props);
		
		const { forms } = this.props;

		return (
			<div style={{ width: 500, margin: '0 auto', padding: 15 }}>
				<h1 className="text-center mb-4 text-red-500">Form Demo List</h1>
				{(!forms || forms.length === 0) ? <div>Loading...</div> :
				 forms.map((form, idx) => {
				 	return (
				 		<div key={idx}>
				 			<p><Link className="underline text-blue-500" to={`/demo/${form._id}`}>{form._id}</Link></p>
				 			<p>Gender: {form.gender}</p>
				 			<p>Category: {form.category}</p>
				 		</div>
				 	)
				 })

				}
			</div>

		); 
	}
}

const mapStateToProps = (state) => {
	return {
		forms: state.form.items || []
	};
}

export default connect(mapStateToProps, { fetchForms })(FormDemo);