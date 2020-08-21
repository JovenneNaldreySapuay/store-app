import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProductsCart } from '../actions/cart';
import CartIconTable from './CartIconTable';

class CartIcon extends Component {

	componentDidMount() {
   		this.props.fetchProductsCart();
  	}

	render() {
		return (
			<div className="cart-details">				
				<CartIconTable 
					products={this.props.products} 
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return { 
	products: state.cart.items	
  };
}

export default connect(mapStateToProps, { fetchProductsCart })(CartIcon);