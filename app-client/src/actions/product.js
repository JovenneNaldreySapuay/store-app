import axios from 'axios';
import { 
	ADD_PRODUCT,
	FETCH_PRODUCTS,
	SEARCH_PRODUCTS,
	UPDATE_PRODUCT,
	DELETE_PRODUCT,
	FETCH_SINGLE_PRODUCT,
	FETCH_PRODUCTS_BY_CATEGORY,
	// FETCH_SINGLE_SHOP_PRODUCT,
} from './types';

// Create new product
// @route - /api/products
export const addProduct = (values) => async (dispatch, getState) => {
	
	// console.log("addProduct values", values);
	const user = getState().auth;

	try {
		const response = await axios.post('/api/products', { values, user });

		// console.log("addProduct response", response);
		// console.log("addProduct getState", user);
		
		dispatch({ 
			type: ADD_PRODUCT, 
			payload: response.data 
		});
	} catch(err) {
		console.log(err);
	}
}

// Fetch all products
// @route - /api/products
export const fetchProducts = () => async (dispatch) => {
		
	try {
		const response = await axios.get('/api/products');
		
		dispatch({ 
			type: FETCH_PRODUCTS, 
			payload: response.data 
		});
	} catch(err) {	
		console.log(err);
	}
}

// Search products
// @route - /api/products/search/:q
export const searchProducts = (query) => async (dispatch) => {
		
	try {
		const response = await axios.get(`/products/search/${query}`);
		
		dispatch({ 
			type: SEARCH_PRODUCTS, 
			payload: response.data 
		});
	} catch(err) {	
		console.log(err);
	}
}

// Fetch single product by ID
// @route - /api/products/:id
export const fetchSingleProduct = (id) => async (dispatch) => {
	
 	try {
		const response = await axios.get(`/api/products/${id}`);
		
		dispatch({ 
			type: FETCH_SINGLE_PRODUCT, 
			payload: response.data
		});					

	} catch(err) {
		console.log(err);
	}
}

// Fetch single shop product 
// @route - /products/:_id
export const fetchSingleShopProduct = (id) => async (dispatch) => {
	
	try {
		const response = await axios.get(`/products/${id}`);

		dispatch({ 
			type: FETCH_SINGLE_PRODUCT, 
			payload: response.data
		});
	} catch(err) {
		console.log(err);
	}
}

// Fetch all products by category
// @route - /products/:category
export const fetchProductsByCategory = (category) => async (dispatch) => {

	try {
		const response = await axios.get(`/products/${category}`);
		
		dispatch({ 
			type: FETCH_PRODUCTS_BY_CATEGORY, 
			payload: response.data 
		});
	} catch(err) {	
		console.log(err);
	}
}

// Update Product 
// @route - /api/products/:id
export const updateProduct = (data) => async (dispatch) => {
	try {
		await axios.put(`/api/products/${data._id}`, {
			data: data,
			headers: {
		    	"Content-Type": "application/json"
		    }
	 	});

		dispatch({
			type: UPDATE_PRODUCT,
			data
		});
	} catch(err) {
		console.log(err);
	}
}

// Update Product 
// @route - /api/products/:id
export const deleteProduct = (id) => async (dispatch) => {

	try {
		await axios.delete(`/api/products/${id}`);
		
		dispatch({ 
			type: DELETE_PRODUCT, 
			payload: id
		});
	} catch(err) {
		console.log(err);
	}
}

