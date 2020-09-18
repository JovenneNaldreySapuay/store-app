import axios from 'axios';
import { 
	ADD_TO_CART_STARTED, 
	ADD_TO_CART_SUCCESS,
	ADD_TO_CART_ERROR,
	DELETE_PRODUCT_CART,
	FETCH_PRODUCTS_CART,
	FETCH_CART_BY_USER,
	FETCH_CART_ITEMS,
} from './types';

export const addToCartStarted = () => ({
  type: ADD_TO_CART_STARTED
});

export const addToCartSuccess = (product) => ({
  type: ADD_TO_CART_SUCCESS,
  payload: product
});

export const addToCartError = (error) => ({
  type: ADD_TO_CART_ERROR,
  payload: { error }
});


export const addProductCart = (product) => {

	const params = { data: product }

	return async (dispatch, getState) => {
		// const cart = getState().cart;

		// console.log("cart", cart);
		// console.log("params", params);

		// const foundId = cart.some(el => el.id === params.data.productid);
  		  		
		dispatch(addToCartStarted());

		return await axios.post("/api/carts", params)
			.then(response => {		
				// console.log("addToCart response:", response);				
				dispatch(addToCartSuccess(response.data));
			}).catch(err => {
				dispatch(addToCartError(err.message));
			})	
	}
}

// Fetch products from cart
export const fetchProductsCart = () => async (dispatch, getState) => {
	// console.log("fetchProductsCart", getState());
	
	try {
		const response = await axios.get('/api/carts');
		
		dispatch({ 
			type: FETCH_PRODUCTS_CART, 
			payload: response.data 
		});
	} catch(err) {	
		console.log(err);
	}
}

export const fetchCartItems = () => async (dispatch, getState) => {
	
	try {
		const response = await axios.get('/api/carts');
		
		dispatch({ 
			type: FETCH_CART_ITEMS,  
			payload: response.data, 
		});

	} catch(err) {	
		console.log(err);
	}
}

// Fetch Cart Items By User Id
export const fetchCartByUser = (uid) => async (dispatch) => {
		
	try {
		const response = await axios.get(`/api/carts/${uid}`);
		// console.log("fetchCartByUser", response);
		
		dispatch({ 
			type: FETCH_CART_BY_USER, 
			payload: response.data, 
		});

		return response;

	} catch(err) {	
		console.log(err);
	}
}

// Delete Cart Item By Product Id
export const deleteProductCart = (id) => async (dispatch) => {

	try {
		await axios.delete(`/api/carts/${id}`);
		
		dispatch({ 
			type: DELETE_PRODUCT_CART, 
			payload: id
		});
	} catch(err) {
		console.log(err);
	}
}

