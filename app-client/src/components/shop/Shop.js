import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Empty from '../Empty';
import ShopItem from './ShopItem';

import { fetchProducts } from '../../actions/product';

class Shop extends Component {

	componentDidMount() {
    	this.props.fetchProducts();
  	}

  	renderProducts(products) {
  		if (products.length === 0) {
			return <div>Loading products... <i className="fa fa-refresh fa-spin"></i></div>
  		} else {
  			return products.map((product, idx) => 
  				   <ShopItem product={product} key={idx} /> )
  		} 
  	}

	render() {
		const { products } = this.props;

		return (
			<div className="container mx-auto lg:w-full bg-white pb-8">
				<div className="p-5">
					<h1 className="text-center uppercase font-bold text-xl tracking-wide">
					Shop Now
					</h1>
				</div>

				<div className="grid lg:grid-cols-6 sm:grid-cols-1 gap-4 sm:px-5 pt-5">	
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