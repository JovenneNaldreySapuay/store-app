import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCheckoutProductsByUserId } from '../actions/checkout';

class MyPurchase extends Component {

	componentDidMount() {
		const { loggedUserId } = this.props;
    	this.props.fetchCheckoutProductsByUserId(loggedUserId);
  	}

	render() {
		console.log("MyPurchase", this.props);
		const { checkouts } = this.props;
		return (
			<div className="mx-auto p-3 w-8/12 bg-white h-screen">
				<h1 className="text-center mb-3">My Purchase</h1>
				{(checkouts.length === 0) ? 
				<p className="text-center">You have no purchased item.</p> :
				checkouts.map((checkout, idx) => {
					return (
						<div className="p-3" key={idx}>
							{
								checkout.products.map((product, idx) => {
									return (
										<div className="bg-white border border-grey-400 p-2" key={idx}>
											<img 
											className="border border-grey-200"
											src={product.image} alt={product.title} width={80} />
											<p>Item Name: {product.title}</p>
											<p>Quantity: {product.quantity}</p>
											<p>Unit Price: ${product.price}</p>
											<p>Subtotal: ${product.total}</p>
										</div>
									)
								})
							}
							<div className="bg-gray-300 p-2">
								<p>Shipping Fee: ${checkout.shipping_fee}</p>
								<p>Overall Total: ${checkout.total}</p>
								<p>Status: Paid</p>
							</div>
						</div>
					)
				})
				}
			</div>
		); 
	}
}

const mapStateToProps = (state) => {
	return {
		checkouts: state.checkout.items,
		loggedUserId: state.auth._id,	
	};
}

export default connect(mapStateToProps, { fetchCheckoutProductsByUserId })(MyPurchase);
