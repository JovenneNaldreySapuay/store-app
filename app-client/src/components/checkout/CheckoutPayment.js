import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

import { handleToken } from '../../actions/checkout';

class CheckoutPayment extends Component {

	render() {
		console.log("CheckoutPayment", this.props);
		
		return (
			<StripeCheckout 
				name="Shopee"
				description="Cart Payment"
				amount={this.props.amount} 
				token={token => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
			<button className="btn">
				Pay with Stripe
			</button>
			</StripeCheckout>
		);
	}
}

export default connect(null, { handleToken })(CheckoutPayment);