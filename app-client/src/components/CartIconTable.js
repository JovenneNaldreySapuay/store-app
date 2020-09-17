import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCartByUser } from '../actions/cart';
import CartIconRow from './CartIconRow';

class CartIconTable extends Component {

	componentDidMount() {
		const { loggedUserId } = this.props;
    	this.props.fetchCartByUser(loggedUserId);
  	}

  	render() {
		//console.log("CartIconTable", this.props);
		const { products } = this.props;
					
		return (
			<React.Fragment>
				{ products.length > 0 ? (
				<div className="bg-gray-100 p-1 rounded-sm">
				<table>
			        <tbody>
			        	{
			  			products.map((product, index) => (
		 					<CartIconRow 
		 						key={index} 
		 						product={product} 
		 					/>
						))
			  			}		        	
			        </tbody> 
				</table>
				<div className="mt-1">
					<Link 
						to="/cart"
						className="bg-gray-500 hover:bg-gray-600 block pl-1 text-center text-white" 
						>
						View Cart &rarr;
					</Link>
				</div>
				</div>
				) : ( <div style={{ width: 120 }} className="bg-white p-1 empty-cart">
			  		<p className="text-center">No Products Yet</p>
			  	</div> ) 
				}
			</React.Fragment>
		)
	}
}

function mapStateToProps(state) {
	return {
		products: state.cart.items,
		loggedUserId: state.auth._id,
	};
}

export default connect(mapStateToProps, { fetchCartByUser })(CartIconTable);