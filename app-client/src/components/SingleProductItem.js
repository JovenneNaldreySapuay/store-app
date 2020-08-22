import React from 'react';
import ProductReviews from './ProductReviews';

const SingleProductItem = ({ product, addToCart, decrement, increment, quantityChange, qtyValue }) => {
	
	return (
		<div className="single-item">
			<div className="single-item-image">
				<img 
				className="border border-grey-100"
				src={product.image} 
				alt={product.title} 
				width={150} 
				/>
			</div>

			<div className="single-item-detail">
				<h2 className="font-semibold">{product.title}</h2>
				<p>Price: ${product.price}</p>
			</div>

			<div className="counter mt-1 mb-3">
				<input
				type="button"
				className="border border-grey-400 font-semibold px-2" 
				value="-"
				onClick={decrement} 
				/>
				<input
				type="number"
				style={{ width: 60 }}
				className="border border-grey-100 text-center" 
				onChange={quantityChange}
				value={qtyValue} 
				/>
				<input 
				type="button"
				className="border border-grey-400 font-semibold px-2" 
				value="+"
				onClick={increment} 
				/>
			</div>

			<button
				onClick={addToCart}
				className="bg-blue-500 text-white rounded p-2 mt-2"
			>
			Add to cart
			</button> 

			<div className="description bg-blue-100 p-3 border my-5">
				<h1 className="font-semibold mb-2">Product Description</h1>
				<p>{product.description}</p>
				<p>Stocks: <span className="font-semibold">{product.stock}</span> available</p>
			</div>

			<div className="reviews bg-blue-100 p-3 border my-5">
				<h1 className="font-semibold mb-2">Product Ratings</h1>
				<ProductReviews />
			</div>
		</div>
	);
};

export default SingleProductItem;