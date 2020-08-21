import React, { Component } from 'react';
import { connect } from 'react-redux';

//import InlineError from './InlineError';

import ReviewProduct from './ReviewProduct';
import FeedbackForm from './FeedbackForm';

import { fetchSingleProduct } from '../actions/product';
import { addReview } from '../actions/review';

class FeedbackContainer extends Component {
		
	state = {
		data: {
			message: '',
			star: ''
		}
	};
	
	componentDidMount() {
		const { productId } = this.props;
		
		if (productId) {
			this.props
			.fetchSingleProduct(productId);
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();

	    const { message, star } = this.state.data;
	    const { userid, productId, name } = this.props;
		
		const review = {
			message,
			star,
			name,
			productId,
			userid,
		}

		// console.log("Feedback:", review);
			
		this.props.addReview(review);
	};

	
	handleChange = (e) => {	
		this.setState({ 
			data: {
				...this.state.data,
				[e.target.name]: e.target.value
			}
		});
	}
		
	validate = (values) => {
    	const errors = {};

    	const { 
    		text, 
    		star } = this.state.data;

    	if (! text) errors.text = "Required";
    	if (! star) errors.star = "Required";
    	
    	return errors;
  	};


	render() {
		const { product, productId } = this.props;
				
		if (! product) {
			return <div>Loading...</div>;
		}

		return (
		 	<div style={{ margin: '0 auto', background: '#fafafa', width: 500, padding: '10px 20px' }}>
		 		{productId === product._id ? (
		 		<div>
			 		<h1>Please give feedback to this item</h1>
			 		<ReviewProduct product={product} />
			 		<FeedbackForm 
			 			handleOnSubmit={this.handleSubmit}
			 			handleOnChange={this.handleChange}
			 		/>
		 		</div>
		 		) : (
		 			<div>No product to review</div>
		 		)
		 		}
		 	</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	// console.log("ownProps", ownProps);

	const { _id, fullName } = state.auth;

	return {
		productId: ownProps.match.params._id,
		product: state.product.item,
		userid: _id,
		name: fullName
	}
}

export default connect(mapStateToProps, { addReview, fetchSingleProduct })(FeedbackContainer);

