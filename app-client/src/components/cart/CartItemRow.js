import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteProductCart } from '../../actions/cart';

const CartItemRow = (props) => {

	return (
		<tr>
			<td className="p-1 border">
				<img 
				className="border border-grey-200 m-auto"
				title={props.product.title}
				src={props.product.image} 
				alt={props.product.title} 
				width={50} 
				/>
			</td>
			<td className="p-1 border text-center">
				<Link 
					className="text-blue-500 underline" 
					to={`/shop/${props.product.slug}/${props.product._product}`}>
					{props.product.title}
				</Link>
			</td>	
			<td className="p-1 border text-center">${props.product.price}</td>	
			<td className="p-1 border text-center">{props.product.quantity}</td>
			<td className="p-1 border text-center">${props.product.total}</td>
			<td className="p-1 border text-center">
				<button 
				onClick={() => props.deleteProductCart(props.product._id) }
				className="btn--delete">
				Delete Item
				</button>
			</td>
		</tr>
	);
};

export default connect(null, { deleteProductCart })(CartItemRow);

