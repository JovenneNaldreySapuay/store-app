import React from 'react';
import { Link } from 'react-router-dom';

const ShopItem = ({ product }) => {
	return (
		<div className="mb-6 border rounded-md overflow-hidden">
			<div className="p-2">
				<Link to={`/shop/${product.slug}/${product._id}`}>
				<img 
				className="border border-grey-200"
				src={product.image} 
				alt="{product.title}" 
				width={150} />
				</Link>
			</div>
			
			<div className="bg-gray-100">
				<div className="p-2">
					<h2 className="underline pt-1 font-bold text-lg text-gray-800 hover:text-gray-500 inline-block">
						<Link to={`/shop/${product.slug}/${product._id}`}>
							{product.title}
						</Link>
					</h2>
					<p>Price: ${product.price}</p>
					<p>{product.stock} stocks available</p>
				</div>
			</div>
		</div>
	);
}

export default ShopItem;