import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProducts } from '../actions/product';

import ShopItem from './ShopItem';

class Shop extends Component {

	componentDidMount() {
    	this.props.fetchProducts();
  	} 	

	render() {

		const { products } = this.props;

		return (
			<div className="container mx-auto w-9/12 bg-white max-w-xl mt-3">
				

				<div className="p-5 mt-2">
					<h1 className="text-center uppercase font-bold text-xl tracking-wide">
						Shop Now
					</h1>
				</div>
				
				<div>
				{(! products || products.length === 0) &&
					<div>Loading... <i className="fa fa-refresh fa-spin"></i></div>
				}

				{products.map((product, idx) => <ShopItem key={idx} product={product} />)}
				</div>
			</div>
		); 
	}
}

function mapStateToProps(state) {
	return {
		products: state.product.items	
	};
}

export default connect(mapStateToProps, { fetchProducts })(Shop);