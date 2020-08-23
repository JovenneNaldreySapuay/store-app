import React from 'react';
import { Link } from 'react-router-dom';

const ShopItem = ({ product }) => {
	return (
		<div className="w-full bg-gray-100 mx-1 mb-6 border rounded-md overflow-hidden">
			<div>
				<Link to={`/shop/${product.slug}/${product._id}`}>
				<img 
				className="border border-grey-200 object-cover w-full"
				src={product.image} 
				alt="{product.title}" 
				width={150} />
				</Link>
			</div>
			
			<div className="bg-gray-100">
				<div className="p-1">
					<h2 className="item-name text-base">
						<Link to={`/shop/${product.slug}/${product._id}`}>
							{product.title}
						</Link>
					</h2>
					<p className="font-bold">${product.price}</p>
					{product.stock < 1 ?
						<p className="text-red-500">Out of stocks</p> :
						<p className="text-gray-600">{product.stock} stocks available</p>
					}	
				</div>
			</div>
		</div>
	);
}

export default ShopItem;