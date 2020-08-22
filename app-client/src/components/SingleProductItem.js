import React from 'react';
import { Link } from 'react-router-dom';

import ProductReviews from './ProductReviews';

const SingleProductItem = ({ product, stocks, addToCart, decrement, increment, quantityChange, qtyValue, isAuth, productIdReview }) => {
	
	return (
		<div className="single-item">
			<div className="single-item-image">
				<img 
				className="border border-grey-100"
				src={product.image} 
				alt={product.title} 
				title={product.title} 
				width={150} 
				/>
			</div>

			<div className="single-item-detail">
				<h2 className="font-semibold">{product.title}</h2>
				<p>Price: ${product.price}</p>
			</div>

			{(isAuth === true && stocks !== 0) && 
			<div className="counter mt-1 mb-2">
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
			}

			{stocks !== 0 && 
			<button
				disabled={isAuth ? false : true }
				onClick={addToCart}
				className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2 mt-1"
			>
			Add to cart
			</button>} 

			{!isAuth && 
			<p className="bg-red-100 p-2 my-2 text-center">
				<span>
				Please create an <Link className="underline text-blue-700" to="/signup">account</Link> or <Link className="underline text-blue-700" to="/login">login</Link> to buy this item
				</span>
			</p>
			}

			<div className="description bg-white p-3 border my-5">
				<h1 className="font-semibold mb-2">Product Description</h1>
				<p>{product.description}</p>
				{stocks < 1 ? <p className="text-red-500">Out of stocks</p> :
				<p>Stocks: <span className="font-semibold">{product.stock}</span> available</p>
			 	}
			</div>

			<div className="reviews bg-white p-3 border my-5">
				<h1 className="font-semibold mb-2">Product Ratings</h1>
				<ProductReviews productId={productIdReview} />
			</div>
		</div>
	);
};

export default SingleProductItem;