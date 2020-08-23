import React, { Component } from 'react';
import { connect } from 'react-redux';

import ShopItem from './shop/ShopItem';
import { fetchProductsByCategory } from '../actions/product';

class MenCategory extends Component {
	// state = {
	// 	category: 'men'
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
			<div className="container mx-auto w-9/12 bg-white max-w-xl mt-3">
				<div className="p-5 mt-2">
					<h1 className="text-center uppercase font-bold text-xl tracking-wide">
						Shop Now
					</h1>
				</div>
				
				<div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4">
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
		category: 'men'
	};
}

export default connect(mapStateToProps, { fetchProductsByCategory })(MenCategory);