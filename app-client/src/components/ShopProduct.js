import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProducts } from '../actions/product';
import ShopListings from './ShopListings';

class ShopProduct extends Component {

	componentDidMount() {
    	this.props.fetchProducts();
  	}

	render() {

		const { products } = this.props;

		if (!products) {
			return <div>Loading products...</div>;
		}

		return (
			<div className="container mx-auto w-9/12 bg-white max-w-xl mt-3">
				<div className="p-5 mt-2">
					<h1 className="text-center uppercase font-bold text-xl tracking-wide">
						Shop Now
					</h1>
				</div>
				
				<ShopListings products={products}/>
			</div>
		); 
	}
}

function mapStateToProps(state) {
	return {
		products: state.product.items	
	};
}

export default connect(mapStateToProps, { fetchProducts })(ShopProduct);