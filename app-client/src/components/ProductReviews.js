import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReviewerInfo from './ReviewerInfo';
import { fetchReviewsByProductId } from '../actions/review';

class ProductReviews extends Component {

	componentDidMount() {
		this.props.fetchReviewsByProductId(this.props.productId);
	}

	reviewContainer() {
		const { reviews } = this.props;

		if (! reviews) {
			return <div>Loading...</div>
		}

		if (reviews.length === 0) {
			return <div>No reviews</div>
		}

		return reviews.map((review, idx) => <ReviewerInfo review={review} key={idx} />)
	}

	render() {
		return (
			<div className="bg-blue-100 p-3 border my-5">
				<h1>Product Ratings</h1>
				{this.reviewContainer()}
			</div>

		); 
	}
}

const mapStateToProps = (state) => {
	return { 
		reviews: state.review.items,
	};
}

export default connect(mapStateToProps, { fetchReviewsByProductId })(ProductReviews);