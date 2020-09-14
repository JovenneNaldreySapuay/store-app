import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { fetchProducts } from '../actions/product';
import ProductItem from './ProductItem';
import Pagination from './Pagination';

class Products extends Component {
	// https://react-component-depot.netlify.app/data-table
	// https://github.com/codegeous/react-component-depot	
	state = {
		products: [],
		filterText: '',
		currentPage: 1,
		postsPerPage: 3,
		loading: false,
	}

	componentDidMount() {
		this.setState({
    		loading: true,
    	})

    	this.props.fetchProducts().then(response => {
    		this.setState({
    			products: response.data || [],
    			loading: false
    		})
    	});
  	}

  	handleFilterTextChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {

		// console.log("[Products] state", this.state);

		const {auth} = this.props;

		const { 
			products,
			filterText, 
			currentPage, 
			postsPerPage, 
		} = this.state;
				
		const rows = [];
		
		// Get current products
		const lastIndex = currentPage * postsPerPage; // 1 * 5 = 5
		const firstIndex = lastIndex - postsPerPage; // 5 - 5 = 0
		const allProducts = products.slice(firstIndex, lastIndex); // 0, 5
		
		// Next page
		const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });
	
		allProducts.filter((product, index) => {
			// console.log("product", product);

			if (product.title.toLowerCase().includes(filterText.toString().toLowerCase()) === -1) return null;
			
			return(
				rows.push(<ProductItem product={product} key={index} />)
			);
		});

		if (!products) {
			return <span>Loading...<i className="fa fa-refresh fa-spin"></i></span>;
		}

		return (
			<div className="container m-auto pb-5">
				{auth.role !== "admin" && <Redirect to="/dashboard" />}

				<div className="p-5 mt-2">
					<h1 className="text-center uppercase font-bold text-xl tracking-wide">
						Manage Products
					</h1>
				</div>
				
				<div className="px-5">
				<input
				className="border border-gray-400 w-full py-1 px-2 my-2" 
				type="text" 
				name="filterText" 
				placeholder="Filter product" 
				onChange={this.handleFilterTextChange}
				/>
				</div>

				<table className="border w-full text-left shadow-sm">
					<thead>
			            <tr>
			              <th className="p-3 text-xs text-gray-900 uppercase font-bold tracking-wide">Image</th>
			              <th className="p-3 text-xs text-gray-900 uppercase font-bold tracking-wide">Name</th>
			              <th className="p-3 text-xs text-gray-900 uppercase font-bold tracking-wide">Price</th>
			              <th className="p-3 text-xs text-gray-900 uppercase font-bold tracking-wide">Stock</th>
			              <th className="p-3 text-xs text-gray-900 uppercase font-bold tracking-wide">Category</th>
			              <th className="p-3 text-xs text-gray-900 uppercase font-bold tracking-wide">Action</th>
			            </tr>  
			        </thead>
			        <tbody>
						{rows}					
			        </tbody>
				</table>

				<Pagination 
					postsPerPage={postsPerPage}
					totalPosts={products.length}
					paginate={paginate}
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