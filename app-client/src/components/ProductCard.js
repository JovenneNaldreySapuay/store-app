import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSingleProduct } from '../actions/product';
import { addProductCart } from '../actions/cart';


class ProductCard extends Component {

	state = {
		quantity: 1,
	}

	componentDidMount() {
		const { productId } = this.props;
		// console.log("componentDidMount productId:", productId);
		if (productId) {
			this.props.fetchSingleProduct(productId);	
		}
	}

	handleAddtoCart = (e) => {
		e.preventDefault();

		const { 
			title,
			slug, 
			image, 
			price,
			_id
		} = this.props.product;

		const { quantity } = this.state;
		
		const total = quantity * price;
		
		const product = { 
			title,
			slug, 
			image,
			price, 
			quantity, 
			total,
			_id
		};			
		
		console.log("add to cart:", product);
		
		// this.props.addProductCart(product);
	}

	render() {
		// console.log("ProductCard", this.props);
		
		const { product, productId } = this.props;

		return (
			<React.Fragment>
				<p>ID: {productId}</p>
				<ProductCardForm 
					addToCart={this.handleAddtoCart}
					product={product}
				/>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return { 
		product: state.product.item
	};
}

export default connect(mapStateToProps, { addProductCart, fetchSingleProduct })(ProductCard);
