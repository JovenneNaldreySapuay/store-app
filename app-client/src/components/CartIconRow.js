import React from 'react';
import { connect } from 'react-redux';

import { deleteProductCart } from '../actions/cart';

const CartIconRow = (props) => {

return (
	<tr>
	<td>{props.product.title}</td>	
	<td className="text-gray-500">
		${props.product.price} &times; {props.product.quantity}
	</td>	
	<td>
	<button 
	onClick={
		() => props.deleteProductCart(props.product._id) 
	}
	className="text-red-400 hover:text-red-500 underline">
		Delete
	</button>
	</td>
	</tr>
);
};

export default connect(null, { deleteProductCart })(CartIconRow);
