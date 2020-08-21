import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteProductCart } from '../actions/cart';

const CartItemRow = (props) => {

	return (
		<tr>
			<td className="p-3 border">
				<Link 
					className="text-blue-500 underline" 
					to={`/shop/${props.product.slug}/${props.product._product}`}>
					{props.product.title}
				</Link>
			</td>	
			<td className="p-3 border">${props.product.price}</td>	
			<td className="p-3 border">- {props.product.quantity} +</td>
			<td className="p-3 border">${props.product.total}</td>
			<td className="p-3 border">
				<button 
				onClick={() => props.deleteProductCart(props.product._id) }
				className="bg-red-700 hover:bg-red-600 p-2 text-white">
				Delete Item
				</button>
			</td>
		</tr>
	);
};

export default connect(null, { deleteProductCart })(CartItemRow);

