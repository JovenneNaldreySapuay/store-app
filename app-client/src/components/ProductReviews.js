import React, { Component } from 'react';
import { connect } from 'react-redux';

import Empty from './Empty';
import ReviewerInfo from './ReviewerInfo';
import { fetchReviewsByProductId } from '../actions/review';

class ProductReviews extends Component {

	componentDidMount() {
		this.props.fetchReviewsByProductId(this.props.productId);
	}

	reviewReviews(reviews) {
		if (! reviews) {
			return <div>Loading...</div>
		}

		if (reviews.length === 0) {
			return <Empty label="No reviews" />
		}

		return reviews.map((review, idx) => 
			<ReviewerInfo review={review} key={idx} />)
	}

	render() {
		const { reviews } = this.props;

		return (
			<React.Fragment>
				{this.reviewReviews(reviews)}
			</React.Fragment>

		); 
	}
}

const mapStateToProps = (state) => {
	return { 
		reviews: state.review.items || []
	};
}

export default connect(mapStateToProps, { fetchReviewsByProductId })(ProductReviews);