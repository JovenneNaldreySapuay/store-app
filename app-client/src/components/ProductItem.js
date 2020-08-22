import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteProduct } from '../actions/product';

class ProductItem extends Component {

	render() {
		
		const { product } = this.props;

		return (
			<tr>
				<td className="p-3 border">
				<img src={product.image} alt="{product.title}" width="100" />
				</td>
				
				<td className="p-3 border">		
				<Link 
				to={`/admin/products/${product._id}`}
				className="underline text-blue-500" 
				>{product.title}
				</Link>
				</td>

				<td className="p-3 border">
					<p>${product.price}</p>
				</td>

				<td className="p-3 border">
					{ product.stock < 1 ? <p className="text-red-500 font-bold">{product.stock}</p> : <p className="text-blue-500 font-bold">{product.stock}</p> }
				</td>

				<td className="p-3 border">
					<p>{product.category}</p>
				</td>

				<td className="p-3 border">
					<div className="edit">
						<Link 
						to={`/admin/products/${product._id}`}
						className="hover:text-blue-500 hover:underline"
						>Edit</Link>
					</div>
					<div className="delete">
						<button 
						className="hover:text-red-500 hover:underline"
						onClick={() => { if (window.confirm(`Are you sure to delete this product?`)) this.props.deleteProduct(product._id) }}
						>Delete</button>
					</div>
				</td>
			</tr>
		);
	}
}

export default connect(null, { deleteProduct })(ProductItem);
