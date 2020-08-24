import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCartByUser } from '../../actions/cart';

import CartItemRow from './CartItemRow';

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const computeCartTotal = (product) => {
	let prices = [];
  	let total = 0;
	product.forEach(item => {
    	prices.push(item.total);
    	total = prices.reduce(reducer);
    })
  	return total;
}

class CartItemTable extends Component {

  	componentDidMount() {
		const { loggedUserId } = this.props;
    	this.props.fetchCartByUser(loggedUserId);
  	}

	render() {
		// console.log("CartItemTable", this.props);
		const { products } = this.props;

		if (! products) {
			return <div>Loading...</div>
		}

		return (
			<React.Fragment>
				{ products.length > 0 ? (
				<React.Fragment>
				<table className="border w-full text-left shadow-sm">
					<thead>
			            <tr>
			              <th className="p-2"></th>
			              <th className="p-2 text-xs text-gray-900 text-center uppercase font-bold tracking-wide">Item Name</th>
			              <th className="p-2 text-xs text-gray-900 text-center uppercase font-bold tracking-wide">Unit Price</th>
			              <th className="p-2 text-xs text-gray-900 text-center uppercase font-bold tracking-wide">Quantity</th>
			              <th className="p-2 text-xs text-gray-900 text-center uppercase font-bold tracking-wide">Item Subtotal</th>
			              <th className="p-2 text-xs text-gray-900 text-center uppercase font-bold tracking-wide">Action</th>
			            </tr>  
			        </thead>
			        <tbody>
			        	{
			        		products.map((product, index) => (
			        			<CartItemRow 
			        				key={index} 
			        				product={product}
			        			/>
			        		))
			        	}
			        </tbody> 
				</table>
				<div className="mb-5 mt-2 flex justify-end">
					<p className="mt-2 mr-6">
						<span 
						className="uppercase font-semibold"
						>total:
						</span>{' '}${computeCartTotal(products)}
					</p>
					<Link to="/checkout">
						<button 
							className="btn"
							>Proceed to Checkout &rarr;
						</button>
					</Link>
				</div>
				</React.Fragment>
				) : ( 
				<div>
			  		<p className="text-center">
			  			Cart is empty
			  		</p>
			  		<div className="m-auto text-center my-2">
			  		<Link 
			  		className="inline-block bg-blue-500 text-white py-1 px-2" 
			  		to="/shop"
			  		>Shop Now
			  		</Link>
			  		</div>
			  	</div> )
			   }
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => ({	
	products: state.cart.items,
	loggedUserId: state.auth._id,	
})

export default connect(mapStateToProps, { fetchCartByUser })(CartItemTable);
