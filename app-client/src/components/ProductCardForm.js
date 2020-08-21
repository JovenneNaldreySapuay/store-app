import React from 'react';
		
const ProductCardForm = ({ addToCart, product }) => {
		
	return (
		<form onSubmit={addToCart}>
			<p>{product.title}</p>
			<p>${product.price}</p>
			<button type="submit">Add To Cart</button>
		</form>
	);
};

export default ProductCardForm;