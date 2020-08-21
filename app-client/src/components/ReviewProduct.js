import React from 'react';
		
const ReviewProduct = ({ product }) => {
		
	return (
		<div>
			<h1>Item: {product.title}</h1>
			<p>Price: ${product.price}</p>
		</div>
	);
};

export default ReviewProduct;