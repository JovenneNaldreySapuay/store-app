import React, { Component } from 'react';
import { connect } from 'react-redux';

import Popup from './Popup';
import Empty from './Empty';
import SingleProductItem from './SingleProductItem';

import { fetchSingleProduct } from '../actions/product';
import { addProductCart } from '../actions/cart';

class Product extends Component {
	state = {
		quantity: 1,
		isLogged: false,
		isShowPopup: false
	}

	componentDidMount() {
		const { id } = this.props;
		if (id) {
			this.props.fetchSingleProduct(id);
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

		const { 
			_id,
			title,
			slug, 
			image, 
			price,
		} = this.props.product;

		const { quantity } = this.state;
		
		const total = quantity * price;
		
		const product = { 
			_id,
			title,
			slug, 
			image,
			price, 
			quantity, 
			total,
		};			
		
		console.log("add to cart:", product);
		
		this.props.addProductCart(product);
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
			return <Empty 
				   label="Something went wrong." 
				   />
		} else {
			return <SingleProductItem 
						increment={this.increment}
						decrement={this.decrement}
						quantityChange={this.quantityChange}
						qtyValue={this.state.quantity}
						product={product} 
						addToCart={this.addToCart}
					/>
		}
	}

	render() {
		// console.log("State:", this.state);
		
		const { product } = this.props;
    	
		return (
			<div style={{ width: 700, margin: '0 auto', padding: 15 }}>

				{this.state.isShowPopup && 
				 <Popup message="Item added to your cart" />}
				
				{this.renderProduct(product)}

			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {

	const { _id } = ownProps.match.params;

	return { 
		id: _id,
		product: state.product.item || {},
	    isAuthenticated: !!state.auth.token,
	};
}

export default connect(
	mapStateToProps, 
	{ addProductCart, fetchSingleProduct }
	)(Product);
