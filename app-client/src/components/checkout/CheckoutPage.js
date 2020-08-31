import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {CardElement} from '@stripe/react-stripe-js';

import CardInput from './CardInput';
import { fetchCartByUser } from '../../actions/cart';
import { addCheckoutProduct } from '../../actions/checkout';

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const computeCartTotal = (obj) => {
	let prices = [];
  	let total = 0;
  	if (Object.keys(obj).length === 0 || obj === undefined) return;

  	// if (Object.keys(obj).length !== 0) {
  		if (obj.length > 0) {
				obj.forEach(item => {
		    	prices.push(item.total)
		    	total = prices.reduce(reducer);			
		    })
		}
	// }
  	
  	return total;
}

class CheckoutPage extends Component {
  
  state = {
  	message: '',
  	shipping_option: '',
  	payment_method: '',
	redirect: false,
	email: '',
	isProcessing: false,
  	// loading: false,
	// errors: {}
  };

  	handlePaypalCheckout = async (e) => {
  		e.preventDefault();	
  	}

  	handleCODCheckout = (e) => {
  		e.preventDefault();	
  	}

	handleStripeCheckout = async (e) => {
	e.preventDefault();
	
	const {stripe, elements} = this.props;

	const { userid, products, shipping_fee } = this.props;
	const { message, shipping_option, payment_method, email } = this.state;
	
	let totalArray = [];
	let subtotal = 0;

	products.forEach(item => {
		totalArray.push(item.total);
		subtotal = totalArray.reduce((a, b) => a + b, 0);
		return subtotal;
	})

	const total = subtotal + shipping_fee;

	let qtyArray = [];
	let totalQty = 0;

	products.forEach(item => {
		qtyArray.push(item.quantity);
		totalQty = qtyArray.reduce((a, b) => a + b, 0);
		return totalQty;
	})

	// stripe not loaded... yet
	if (!stripe || !elements) {
    	return;
    }

  	const checkoutProduct = {
  		products: products,
  		shipping_option: shipping_option,
  		payment_method: payment_method,
  		message: message,
  		shipping_fee: shipping_fee,
  		quantity: totalQty,
  		total: total,
  		userid: userid,
  		email: email,
  	}
  	
	console.log("Checkout Data:", checkoutProduct);
	
	this.setState({ isProcessing: true });
	
	const response = await this.props.addCheckoutProduct(checkoutProduct);

	console.log("Client Response", response);

	const clientSecret = response.data['client_secret'];

	console.log("clientSecret", clientSecret);

	const result = await stripe.confirmCardPayment(clientSecret, {
		payment_method: {
			card: elements.getElement(CardElement),
			billing_details: {
				email: email, 
			},
		},
	});

	console.log("confirmCardPayment result:", result);

	if (result.error) {
		// Show error to your customer (e.g., insufficient funds)
		console.log(result.error.message);

		this.setState({ isProcessing: false });
		this.setState({ redirect: false });

	} else {
		// The payment has been processed!
		if (result.paymentIntent.status === 'succeeded') {
			console.log('Money is in the bank!');

			this.setState({ redirect: true });
		}
	}	
  }	

	componentDidMount() {
		const { _id } = this.props.user;
		this.props.fetchCartByUser(_id);
	}

	handleOnChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		})
	}
  
render() {

  const { products, user } = this.props;
  const subTotal = computeCartTotal(products);
  const total = subTotal + this.props.shipping_fee;
  const fullAddress = `${user.address}, ${user.city}, ${user.province}, ${user.country}, ${user.zipcode}`;
  
  // console.log("CheckoutPage", this.props);
  
  return (  		 
		  <div className="container mx-auto w-full bg-white pt-3" style={{ minHeight: '100vh' }}>
		     <div className="p-5 mt-2">
				<h1 className="text-center uppercase font-bold text-xl tracking-wide">
					Checkout
				</h1>
			 </div>

			  { products.length > 0 ? ( 
			 	<div className="w-10/12 mx-auto">  
					<div className="delivery-address p-3 my-3 bg-blue-100 mb-5">
						<h2 className="text-black pb-2 font-semibold">Delivery Address</h2>
						<p>
						<span className="font-semibold">
						{user.fullName}{' '}({user.phone}){' '}
						</span> 
						<span className="text-gray-700">
						{fullAddress}
						</span>
						</p>
					</div>

		       		<h1 className="text-center font-semibold text-xl tracking-wide">Products Ordered</h1>

					<table border="1" className="checkout-table border w-full mt-3 mb-2">
						<thead>
						<tr>
						<th className="p-2 text-xs text-gray-900 uppercase font-bold tracking-wide"></th>
						<th className="p-2 text-xs text-gray-900 uppercase font-bold tracking-wide">Item Name</th>
						<th className="p-2 text-xs text-gray-900 uppercase font-bold tracking-wide">Unit Price</th>
						<th className="p-2 text-xs text-gray-900 uppercase font-bold tracking-wide">Quantity</th>
						<th className="p-2 text-xs text-gray-900 uppercase font-bold tracking-wide">Item Subtotal</th>
						</tr>
						</thead>
						<tbody>
						{  
						products.map(item => {
						return (
						<tr key={item._id}>
						<td className="p-1 border">
						<img 
						className="border border-grey-200 m-auto"
						title={item.title}
						src={item.image} 
						alt={item.title} 
						width={50} 
						/>
						</td>
						<td className="p-1 border text-center">{item.title}</td>
						<td className="p-1 border text-center">${item.price}</td>
						<td className="p-1 border text-center">{item.quantity}</td>
						<td className="p-1 border text-center">${item.total}</td>
						</tr>
						)})
						}
						</tbody>         
					</table>
		        
					<div className="flex justify-end">
						<div className="border border-grey-200 mb-6 w-6/12 px-3 py-4">	
						<div className="leave-message px-3">
						<label htmlFor="message">Leave a message:&nbsp;</label>
						<input className="border p-2" type="text" name="message" id="message" placeholder="Your message..." onChange={this.handleOnChange} />
						</div>  

						<div onChange={this.handleOnChange} className="shipping-option px-3">
						<p style={{fontWeight: 'bold'}}>Shipping Option:</p>
						<p>
						<input type="radio" id="std" name="shipping_option" value="Standard Delivery" />
						<label htmlFor="std">&nbsp;Standard Delivery</label>
						</p>  
						<p>
						<input type="radio" id="ninjavan" name="shipping_option" value="Ninja Van" />
						<label htmlFor="ninjavan">&nbsp;Ninja Van</label>
						</p>  
						</div>

						<div onChange={this.handleOnChange} className="payment-method p-3">
						<p style={{fontWeight: 'bold'}}>Payment Method:</p>
						<p>
						<input type="radio" disabled id="cod" name="payment_method" value="COD" />
						<label htmlFor="cod">&nbsp;COD</label> <span className="text-gray-400 italic ml-2 text-xs">Coming soon...</span>
						</p>
						<p>
						<input type="radio" disabled id="paypal" name="payment_method" value="PayPal" /> 
						<label htmlFor="paypal">&nbsp;PayPal</label> <span className="text-gray-400 italic ml-2 text-xs">Coming soon...</span>
						</p>
						<p>
						<input type="radio" id="credit" name="payment_method" value="Credit Card" />
						<label htmlFor="credit">&nbsp;Credit Card</label>
						</p>
						
						</div>

						<div className="payment-summary bg-gray-200 p-3">
							<p>Merchandise Subtotal: <span className="font-semibold">${subTotal}</span></p>
							<p>Shipping Total: <span className="font-semibold">${this.props.shipping_fee}</span></p>
							<p className="total-payable mb-4">Total Payment: <span className="font-semibold">${total}</span></p>
							
							{this.state.payment_method === 'Credit Card' &&
							<div className="stripe-section">	
								<label htmlFor="email">Email:&nbsp;</label>
								<input className="border p-2" type="text" name="email" id="email" placeholder="Email address" onChange={this.handleOnChange} />
								<label htmlFor="credit">Credit Card:&nbsp;</label>
								<CardInput />

								<div className="payment-cta mt-1 mb-3 flex justify-end">
									<button 
									onClick={this.handleStripeCheckout} 
									className="btn mt-3"
									>{this.state.isProcessing ? "Processing..." : "Checkout with Stripe"}
									</button>
								</div> 
							</div>	
							}

							{/* this.state.payment_method === 'PayPal' &&
							<div className="paypal-section flex justify-end">	
								<button className="btn">Checkout with Paypal</button>
								
							</div>	
							*/}

							{/*this.state.payment_method === 'COD' &&
							<div className="cash-section flex justify-end">	
								<button className="btn">Place Order</button>
								
							</div>	
							*/}

							{this.state.redirect && <Redirect to="/success" />}
							
						</div>
						</div> 
					</div> 

			    </div>
			    )
		    	: (
		    	 <div>
		    		<h1 className="text-center mb-2">No products to checkout</h1>	
		    		<p className="text-center"><Link to="/"><button className="btn">Shop Now</button></Link></p>
		    	 </div>
		    	) 
		    }
		     </div>   		
		)
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.cart.items,
		userid: state.auth._id,
		user: state.auth,
		shipping_fee: 5
	};
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addCheckoutProduct: addCheckoutProduct,
  fetchCartByUser: fetchCartByUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);