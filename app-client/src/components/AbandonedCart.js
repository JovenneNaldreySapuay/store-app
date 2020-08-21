import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCartItems } from '../actions/cart';

class AbandonedCart extends Component {
	state = {

	};

	componentDidMount() {
		this.props.fetchCartItems();
	}

	render() {
		const { carts } = this.props;
		console.log("AbandonedCart", this.props);

		return (
			<div style={{ width: 600, margin: '0 auto' }}>
				<h1 className="text-center">Abandoned Cart</h1>
				
				{(! carts) &&
					<div>Loading... <i className="fa fa-refresh fa-spin"></i></div>
				}

				{(carts.length === 0) &&
					<div>No records to show.</div>
				}

				{carts.map((cart, idx) => {
					return (
						<div key={idx} className="my-3 bg-blue-100 p-3">
							<img 
							className="border border-grey-200"
							src={cart.image} alt={cart.title} width={100} />
							<p>Cart Owner ID: <span className="underline text-red-400">{cart._user}</span></p>
							<p>Item Name: {cart.title}</p>
							<p>Price: ${cart.price}</p>
							<p>Quantity: {cart.quantity}</p>
							<p>Total: ${cart.total}</p>
							<button
							className="mt-2 bg-blue-500 text-white py-1 px-2"
							>Send Reminder</button>
						</div>
					)
					}) 
				}
			</div>

		); 
	}
}

function mapStateToProps(state) {
	return {
		carts: state.cart.items || []
	};
}

export default connect(mapStateToProps, { fetchCartItems })(AbandonedCart);