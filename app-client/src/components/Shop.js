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
			<div className="container mx-auto w-full bg-white max-w-xl mt-3">
			
			{this.renderProducts(products)}

			</div>
		); 
	}
}

const mapStateToProps = (state) => ({
	products: state.product.items || []
})

export default connect(mapStateToProps, { fetchProducts })(Shop);