import React, { Component } from 'react';
import { connect } from 'react-redux';

import ShopItem from './shop/ShopItem';
import { fetchProductsByCategory } from '../actions/product';

class WomenCategory extends Component {
	// state = {
	// 	category: 'women'
	// }

	componentDidMount() {
		const { category } = this.props;
		if (category) {
    		this.props.fetchProductsByCategory(category);
    	}
  	}

	render() {
		const { products } = this.props;

		return (
			<div className="mx-auto w-9/12 bg-white pb-8">
				<div className="p-5">
					<h1 className="text-center uppercase font-bold text-xl tracking-wide">
						Shop Now
					</h1>
				</div>

				<div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 px-6 pt-5">
				{(! products || products.length === 0) &&
					<div>Loading... <i className="fa fa-refresh fa-spin"></i></div>
				}

				{products.map((product, idx) => <ShopItem key={idx} product={product} />)}

				</div>
			</div>

		); 
	}
}

const mapStateToProps = (state, ownProps) => {
	// const path = ownProps.match.path;
	// const pathStripped = path.replace(/\//g, "");
	return {
		products: state.product.items,
		category: 'women'
	};
}

export default connect(mapStateToProps, { fetchProductsByCategory })(WomenCategory);