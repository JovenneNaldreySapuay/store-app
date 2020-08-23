import React, { Component } from 'react';
import { connect } from 'react-redux';

import Empty from './Empty';
import ShopItem from './ShopItem';

import { fetchProducts } from '../actions/product';

class Shop extends Component {

	componentDidMount() {
    	this.props.fetchProducts();
  	}

  	renderProducts(products) {
  		if (products.length === 0) {
  			return <Empty label="No products to display" />
  		} else {
  			return products.map((product, idx) => 
  				   <ShopItem product={product} key={idx} /> )
  		}
  	}

	render() {
		const { products } = this.props;

		return (
			<div className="container mx-auto w-full bg-white mt-3">
			<div className="p-5 mt-2">
				<h1 className="text-center uppercase font-bold text-xl tracking-wide">
				Shop Now
				</h1>
			</div>

			<div className="flex justify-around">	
				{this.renderProducts(products)}
			</div>
			<div className="flex justify-around">	
				{this.renderProducts(products)}
			</div>
			<div className="flex justify-around">	
				{this.renderProducts(products)}
			</div>
			</div>
		); 
	}
}

const mapStateToProps = (state) => ({
	products: state.product.items || []
})

export default connect(mapStateToProps, { fetchProducts })(Shop);