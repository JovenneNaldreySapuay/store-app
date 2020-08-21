import React from 'react';
import ProductItem from './ProductItem';
		
const ProductListings = ({ products }) => {
	
	if (! products) {
		return <div>Loading... <i className="fa fa-refresh fa-spin"></i></div>
	}

	if (products.length === 0) {
		return <div>No records to show.</div>
	}

	return (
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
			{ 
			products.map((product, index) => 
			<ProductItem product={product} key={index} />) 
			}
	        </tbody>
		</table>
	);
};

export default ProductListings;