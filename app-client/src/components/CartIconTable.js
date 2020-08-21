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
		console.log("CartIconTable", this.props);
		const { products } = this.props;
					
		return (
			<React.Fragment>
				{ products.length > 0 ? (
				<div className="bg-blue-200 p-1">
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
						className="pl-1 underline text-blue-500 hover:text-blue-700" 
						>
						View My Shopping Cart &rarr;
					</Link>
				</div>
				</div>
				) : ( <div className="bg-blue-200 p-1">
			  		<p>Cart is empty{' '}
			  		<Link 
			  		className="underline text-blue-500" to="/"
			  		>Shop Now
			  		</Link>
			  		</p>
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