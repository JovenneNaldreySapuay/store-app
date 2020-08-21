import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { fetchCartByUser } from '../actions/cart';
import { addCheckoutProduct } from '../actions/checkout';

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
  	// loading: false,
	// errors: {}
  };

  handleOrderClick = (e) => {
	e.preventDefault();

	const { shipping_fee } = this.props;
	const { products } = this.props;
	const { message, shipping_option, payment_method } = this.state;
	
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

  	const checkoutProduct = {
  		products: products,
  		shipping_option: shipping_option,
  		payment_method: payment_method,
  		message: message,
  		shipping_fee: shipping_fee,
  		quantity: totalQty,
  		total: total,
  	}
  	
	// console.log("Checkout Data:", checkoutProduct);
	
	this.props.addCheckoutProduct(checkoutProduct);

	this.setState({ 
		redirect: true
	});

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

  const { redirect } = this.state;
  const { products, user } = this.props;
  
  console.log("CheckoutPage", this.props);

  const subTotal = computeCartTotal(products);
  const total = subTotal + this.props.shipping_fee;

  const fullAddress = `${user.address}, ${user.city}, ${user.province}, ${user.country}, ${user.zipcode}`;
  return (
	     <div className="checkout p-4">
	     <div className="p-5 mt-2">
			<h1 className="text-center uppercase font-bold text-xl tracking-wide">
				Checkout
			</h1>
		  </div>
		  { products.length > 0 ? ( 
		 <div>  
	     <div className="delivery-address p-3 my-3 bg-red-100">
	  	 	<h2 className="text-orange-400 pb-2 font-bold">Delivery Address</h2>
	  	 	<p>
	  	 	<span className="font-semibold">
	  	 	{user.fullName}{' '}({user.phone}){' '}
	  	 	</span> 
	  	 	<span className="text-gray-700">
	  	 	{fullAddress}
	  	 	</span>
	  	 	</p>
	  	 </div>

	       <h1 className="text-center uppercase font-bold text-xl tracking-wide">Products Ordered</h1>

	       <table border="1" className="checkout-table border w-full mt-3">
	       <thead>
	         <tr>
	            <th className="p-3 text-xs text-gray-900 uppercase font-bold tracking-wide">Item Name</th>
	            <th className="p-3 text-xs text-gray-900 uppercase font-bold tracking-wide">Unit Price</th>
	            <th className="p-3 text-xs text-gray-900 uppercase font-bold tracking-wide">Quantity</th>
	            <th className="p-3 text-xs text-gray-900 uppercase font-bold tracking-wide">Item Subtotal</th>
	        </tr>
	       </thead>
	       <tbody>
	       {  
	          products.map(item => {
	            return (
	              <tr key={item._id}>
	                <td className="p-3 border text-center">{item.title}</td>
	                <td className="p-3 border text-center">${item.price}</td>
	                <td className="p-3 border text-center">{item.quantity}</td>
	                <td className="p-3 border text-center">${item.total}</td>
	              </tr>
	            )})
	        }
	        </tbody>         
	        </table>
	        
	        <div className="leave-message p-3">
	          <label htmlFor="message">Leave a message:&nbsp;</label>
	          <input className="border p-2" type="text" name="message" id="message" placeholder="Your message..." onChange={this.handleOnChange} />
	        </div>  
	       
	        <div onChange={this.handleOnChange} className="shipping-option p-3">
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
	          <input type="radio" id="cod" name="payment_method" value="COD" />
	          <label htmlFor="cod">&nbsp;COD</label>
	          </p>  
	          <p>
	          <input type="radio" id="credit" name="payment_method" value="Credit Card" />
	          <label htmlFor="credit">&nbsp;Credit Card</label>
	          </p>
	          <p>
	          <input type="radio" id="paypal" name="payment_method" value="PayPal" />
	          <label htmlFor="paypal">&nbsp;PayPal</label>
	          </p>
	        </div>
	       
	        <div className="payment-summary bg-gray-200 p-3">
	          <p>Merchandise Subtotal: ${subTotal}</p>
	          <p>Shipping Total: ${this.props.shipping_fee}</p>
	          <p className="total-payable">Total Payment: ${total}</p>
	        </div>

	        <div className="payment-cta mt-1">
	          <button onClick={this.handleOrderClick} className="bg-blue-500 text-white px-3 py-2 mt-3">Place Order</button>
	          { redirect && ( 
			 		<Redirect to="/" /> 
			  )}
	        </div> 

		    </div>
		    )
	    	: (
	    	 <div>
	    		<h1 className="text-center mb-2">No products to checkout</h1>	
	    		<p className="text-center"><Link to="/account/my-purchase"><button className="bg-blue-500 p-2 text-white">Shop Here</button></Link></p>
	    	 </div>
	    	)}
	     </div>   
  	)
	}
}

function mapStateToProps(state) {
	return {
		products: state.cart.items,
		user: state.auth,
		shipping_fee: 5
	};
}

export default connect(mapStateToProps, { fetchCartByUser, addCheckoutProduct })(CheckoutPage);