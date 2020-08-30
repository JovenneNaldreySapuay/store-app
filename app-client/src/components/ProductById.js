import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Popup from './Popup';
import Single from './Single';

import { fetchSingleProduct } from '../actions/product';
import { addProductCart } from '../actions/cart';

// import { ADD_TO_CART_SUCCESS } from '../actions/types';

class ProductById extends Component {
	state = {
		quantity: 1,
		isLogged: false,
		isShowPopup: false
	}

	componentDidMount() {
		const { fetchProduct, productid } = this.props;
		
		if (productid) {
			fetchProduct(productid);
		}
	}

	increment = (e) => {
		if (this.state.quantity < this.props.product.stock) {
    		this.setState(prevState => ({ 
    			quantity: prevState.quantity + 1 
    		}));
		}
	}

	decrement = (e) => {
		if (this.state.quantity > 1) {
    		this.setState(prevState => ({ 
    			quantity: prevState.quantity - 1
    		}));
  		}
	}

	quantityChange = (e) => {
		this.setState({
			quantity: this.props.qtyValue
		})
	}
	
	addToCart = (e) => {
		e.preventDefault();

		const { userid, productid } = this.props;

		const { quantity } = this.state;
		
		const product = { 
			productid, 
			quantity,
			userid 
		};			
		
		// console.log("add to cart:", product);
		
    	this.props.addToCart(product);
		this.showPopup();
  	}	

  	showPopup = () => {
		this.setState({
		  isShowPopup: true
		}, () => { setTimeout(this.closePopup, 1000) });
	}

	closePopup = () => {
		this.setState({
		  isShowPopup: false
		});
	}

	randomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1))
	}

	renderProduct(product) {
		if (Object.keys(product).length === 0) {
			return <div>Loading item... <i className="fa fa-refresh fa-spin"></i></div>
		} else {
			return <Single 
						increment={this.increment}
						decrement={this.decrement}
						quantityChange={this.quantityChange}
						qtyValue={this.state.quantity}
						product={product} 
						addToCart={this.addToCart}
						isAuth={this.props.isAuthenticated}
						productIdReview={this.props.id}
						stocks={this.props.product.stock}
					/>
		}
	}

	render() {
		// console.log("Product", this.props);

		const { product } = this.props;
		    	
		return (
			<div className="w-full sm:w-8/12 mx-auto">

				{this.state.isShowPopup && 
				 <Popup message="Item added to your cart" />}
				
				{this.renderProduct(product)}

			</div>
		);
	}
}

// const mapDispatchToProps = (dispatch) => bindActionCreators({
//   addToCart: (payload) => dispatch({ type: ADD_TO_CART_SUCCESS, payload }),
//   fetchProduct: fetchSingleProduct
// }, dispatch); 

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addToCart: addProductCart,
  fetchProduct: fetchSingleProduct
}, dispatch);

const mapStateToProps = (state, ownProps) => {
	const { _id } = ownProps.match.params;
	return { 
		productid: _id,
	    userid: state.auth._id,
		product: state.product.item || {},
	    isAuthenticated: !!state.auth.token,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductById);


