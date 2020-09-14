import React from 'react';
import { Link } from 'react-router-dom';

// import ProductReviews from './ProductReviews';

const Single = ({ product, stocks, addToCart, decrement, increment, quantityChange, qtyValue, isAuth, productIdReview }) => {
	
	return (
		<div className="single">
			<div className="lg:flex sm:flex-none">
				<div className="single__image">
					<img 
					className="border border-grey-100 lg:w-64 sm:w-full"
					src={product.image} 
					alt={product.title} 
					title={product.title} 
					/>
				</div>

				<div className="single__details lg:ml-5 sm:ml-0">
					<h2 className="single__name">{product.title}</h2>
					<p className="single__price">${product.price}</p>
				
					{(isAuth === true && stocks !== 0) && 
					<div className="counter mt-1 mb-2">
						<input
						type="button"
						className="border border-grey-400 font-semibold px-2" 
						value="-"
						onClick={decrement} 
						/>
						<input
						type="text"
						style={{ width: 60 }}
						className="border border-grey-100 text-center" 
						onChange={quantityChange}
						value={qtyValue}
						disabled 
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
						className="btn mt-2"
					>
					Add to cart
					</button>} 
				</div>
			</div>

			{!isAuth && 
			<div className="not-logged">
			<p className="bg-red-100 p-2 my-2">
				<span>
				Please create an <Link className="underline text-blue-700" to="/signup">account</Link> or <Link className="underline text-blue-700" to="/login">login</Link> to buy this item. 
				</span>
			</p>
			</div>
			}

			<div className="box">
				<h1 className="box__header">Product Description</h1>
				<p>{product.description}</p>
				{stocks < 1 ? <p className="product--nostock">Out of stocks</p> :
				<p className="product--instock">Stocks: <span className="text-gray-700">{product.stock}</span> available</p>
			 	}
			</div>

			<div className="box">
				<h1 className="box__header">Product Reviews</h1>
				{/* <ProductReviews productId={productIdReview} /> */}
			</div>
		</div>
	);
};

export default Single;