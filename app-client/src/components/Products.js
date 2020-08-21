import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { fetchProducts } from '../actions/product';

import ProductListings from './ProductListings';
// import ProductItem from './ProductItem';

// import SearchBar from './SearchBar';
// import Pagination from './Pagination';

class Products extends Component {

	state = {
		currentPage: 1,
		postsPerPage: 2,
		// filterText: '',
	}

	componentDidMount() {
    	this.props.fetchProducts();
  	}

 //  	handleFilterTextChange = (filterText) => {
	// 	this.setState({
	// 		filterText: filterText
	// 	});
	// }

	render() {

		const { products, auth } = this.props;
		// const { currentPage, postsPerPage, filterText } = this.state;
		// const { postsPerPage } = this.state;
		
		// const rows = [];
		
		// Get current products
		// const lastIndex = currentPage * postsPerPage; // 1 * 1 = 1
		// const firstIndex = lastIndex - postsPerPage; // 1 - 1 = 0
		// const allProducts = products.slice(firstIndex, lastIndex); // 0, 1
		
		// console.log("allProducts", allProducts);
	
		// products.map((product, index) => {
		// 	if (product.title.toLowerCase().indexOf(filterText.toLowerCase()) === -1) return null;
			
		// 	return(
		// 		rows.push(<ProductItem key={index} product={product} />)
		// 	);
		// });

		// if (!products) {
		// 	return <span>Loading...<i className="fa fa-refresh fa-spin"></i></span>;
		// }

		// console.log("State:", this.state);

		return (
			<div className="container mx-auto w-9/12 bg-white max-w-xl mt-3">
				{auth.role !== "admin" && <Redirect to="/dashboard" />}

				<div className="p-5 mt-2">
					<h1 className="text-center uppercase font-bold text-xl tracking-wide">
						Manage Products
					</h1>
				</div>
				<div className="mt-2">
					<Link 
					to="/admin/products/new"
					className="mb-1 inline-block bg-blue-500 text-white hover:bg-blue-700 px-2 py-1"
					>Add New Product</Link>

					<Link 
					to="/admin/products/category"
					className="ml-2 mb-1 inline-block border border-blue -500 text-blue-500 hover:bg-blue-500 hover:text-white px-2 py-1"
					>Add New Category</Link>
				</div>

				<ProductListings 
					products={products}
				/>
	
			</div>
		); 
	}
}

function mapStateToProps(state) {
	return {
		products: state.product.items || [],
		auth: state.auth	
	};
}

export default connect(mapStateToProps, { fetchProducts })(Products);