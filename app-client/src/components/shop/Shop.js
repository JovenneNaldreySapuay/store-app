import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

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
			<>
				<div className="bg-white container lg:w-full mx-auto categories">
					<h1>Categories</h1>
				</div>
				<div className="bg-white container lg:w-full mb-5 mx-auto flex pb-10 pl-4">
					<Link to="/shop/women">
					<div style={{height:100, paddingRight:20}}>
						<div className="category-bg-1 category-bg"></div>
						<div className="category-title bg-white">
							<h1>Women's Apparel</h1>
						</div>
					</div>
					</Link>
					<Link to="/shop/men">
					<div style={{height:100, paddingRight:20}}>
						<div className="category-bg-2 category-bg"></div>
						<div className="category-title bg-white">
							<h1>Men's Apparel</h1>
						</div>
					</div>
					</Link>

					<Link to="/shop/gadgets">
					<div style={{height:100, paddingRight:20}}>
						<div className="category-bg-3 category-bg"></div>
						<div className="category-title bg-white">
							<h1>Mobiles &amp; Gadgets</h1>
						</div>
					</div>
					</Link>
				</div>
				<div className="container mx-auto lg:w-full bg-white pb-8">
					<div className="p-5">
						<h1 className="text-center uppercase font-bold text-xl tracking-wide">
						Shop All
						</h1>
					</div>
					<div className="grid lg:grid-cols-6 sm:grid-cols-1 gap-4 sm:px-5 pt-5">	
						{this.renderProducts(products)}
					</div>
				</div>
			</>
		); 
	}
}

const mapStateToProps = (state) => ({
	products: state.product.items || []
})

export default connect(mapStateToProps, { fetchProducts })(Shop);