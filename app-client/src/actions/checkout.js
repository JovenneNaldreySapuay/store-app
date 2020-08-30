import axios from 'axios';
import { 
	ADD_CHECKOUT_PRODUCT,
	FETCH_CHECKOUT_PRODUCTS,
	FETCH_CHECKOUT_PRODUCTS_BY_ID,
	FETCH_CHECKOUT_PRODUCTS_BY_USER,
	FETCH_USER
} from './types';

// Add product to cart
export const addCheckoutProduct = (values) => async (dispatch) => {
	
	// console.log("addCheckoutProduct values", values);

	try {
		const response = await axios.post('/api/checkouts', { values });				
			
		dispatch({ 
			type: ADD_CHECKOUT_PRODUCT, 
			payload: values 
		});

		// return response - will return a .Promise() to the client side
		// The client side will consume this .Promise()
		// by doing .then 
		// e.g this.props.addToCart(item).then(response => ...)
		return response; 
		                 			
	} catch(err) {
		console.log(err);
	}
}

// Fetch All Checkout Products
export const fetchCheckoutProducts = () => async (dispatch) => {
		
	try {
		const response = await axios.get('/api/checkouts');
		
		dispatch({ 
			type: FETCH_CHECKOUT_PRODUCTS, 
			payload: response.data 
		});
	} catch(err) {	
		console.log(err);
	}
}

// Fetch Checkout Products By User Id
export const fetchCheckoutProductsByUserId = (uid) => async (dispatch, getState) => {
	
	const { _id } = getState().auth;

	try {
		const response = await axios.get(`/checkouts/user/${_id}`);
		
		dispatch({ 
			type: FETCH_CHECKOUT_PRODUCTS_BY_USER, 
			payload: response.data 
		});
	} catch(err) {	
		console.log(err);
	}
}

// Fetch Checkout Products By User Id
export const fetchCheckoutProductsById = (id) => async (dispatch, getState) => {
	
	try {
		const response = await axios.get(`/checkouts/transaction/${id}`);
		
		dispatch({ 
			type: FETCH_CHECKOUT_PRODUCTS_BY_ID, 
			payload: response.data 
		});
	} catch(err) {	
		console.log(err);
	}
}

export const handleToken = (token) => async (dispatch) => {
	const res = await axios.post('/api/stripe', token);	
	
	console.log("handleToken", res);

	dispatch({ 
		type: FETCH_USER, 
		payload: res.data 
	});
};
