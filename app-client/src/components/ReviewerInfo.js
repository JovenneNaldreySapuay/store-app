import React from 'react';
		
const ReviewerInfo = ({ review }) => {
		
	return (
		<React.Fragment>
			<p style={{fontWeight: 'bold'}}>{review.name}</p>
			<p>{review.star} stars</p>
			<p>{review.message}</p>
		</React.Fragment>
	);
};

export default ReviewerInfo;