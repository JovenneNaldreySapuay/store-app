import React from 'react';
import { Link } from 'react-router-dom';

const ShopItem = ({ product }) => {
	return (
		<div className="product product--bg">
			<div>
				<Link to={`/shop/${product.slug}/${product._id}`}>
				<img 
				className="product__image product__border"
				src={product.image} 
				alt="{product.title}" 
				width={150}
				height={193}
				/>
				</Link>
			</div>
			
			<div className="px-2 py-0">
				<h2 className="product__name">
					<Link to={`/shop/${product.slug}/${product._id}`}>
						{product.title}
					</Link>
				</h2>
				<p className="product__price">${product.price}</p>
				{product.stock < 1 ?
					<p className="product--nostock">Out of stocks</p> :
					<p className="product--instock">{product.stock} {product.stock === 1 ? 'stock' : 'stocks'} available</p>
				}	
			</div>
		</div>
	);
}

export default ShopItem;