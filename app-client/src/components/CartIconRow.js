import React from 'react';
import { connect } from 'react-redux';

import { deleteProductCart } from '../actions/cart';

const CartIconRow = (props) => {

return (
	<tr>
	<td className="p-1">{props.product.title}</td>	
	<td className="p-1 text-gray-500">
		{props.product.price} &times; {props.product.quantity}
	</td>	
	<td className="p-1">
	<button 
	onClick={
		() => props.deleteProductCart(props.product._id) 
	}
	className="text-red-600 underline">
		Delete
	</button>
	</td>
	</tr>
);
};

export default connect(null, { deleteProductCart })(CartIconRow);
