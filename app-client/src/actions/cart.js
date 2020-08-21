import axios from 'axios';
import fetch from 'cross-fetch';

import { 
	ADD_TO_CART_STARTED, 
	ADD_TO_CART_SUCCESS,
	ADD_TO_CART_ERROR,
	DELETE_PRODUCT_CART,
	FETCH_PRODUCTS_CART,
	FETCH_CART_BY_USER,
	FETCH_CART_ITEMS,
	// ADD_CART_SUCCESS,
	// ADD_CART_ERROR
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

	return (dispatch, getState) => {

		const { _id } = getState().auth;

		let params = { 
			title: product.title,
			slug: product.slug,
			image: product.image,
			price: product.price,
			quantity: product.quantity,
			total: product.total,
			_product: product._id,
			_user: _id,
		};
		
		console.log("params:", params);

		// const cartItems = getState().cart.items.slice();
		// let alreadyExists = false;
		// cartItems.forEach((item) => {
		// 	if (item._id === product._id) {
		// 	  alreadyExists = true;
		// 	  item.quantity++;
		// 	}
		// });
		// if (!alreadyExists) {
		// 	cartItems.push({ ...product, quantity: 1 });
		// }
		// console.log("cartItems", cartItems);

		// axios.post("/api/carts", params)
		// .then(response => {
		// 	let { data } = response.data;
		// 	setTimeout(() => {
  //         		dispatch(addToCartSuccess(data));
  //       	}, 2000);			
		// }).catch(err => {
		// 	dispatch(addToCartError(err.message))
		// });

		// dispatch(addToCartStarted());
		// return axios.post("/api/carts", params)
		// .then(response => {
		// 	let { data } = response;
		// 	dispatch(addToCartSuccess(data));
		// }).catch(err => {
		// 	dispatch(addToCartError(err.message));
		// }) 		

		dispatch(addToCartStarted());

		return fetch('/api/carts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
		})
		.then(response => response.json())
		.then(data => {
			dispatch(addToCartSuccess(data));
		})
		.catch(err => {
			dispatch(addToCartError(err.message));
		})
	}
}

/*
export const addProductCart = (values) => { 
	return (dispatch, getState) => {
	
		const { _id } = getState().auth;
		
		axios.post('/api/carts', { 
			_id, 
			values 
		}).then(response => {
			console.log("addProductCart response:", response.data);

			dispatch({ 
				type: ADD_PRODUCT_CART, 
				payload: response.data
			});

		}).catch(err => {

			console.log(err);

		})					
	}
}
*/

// const handleResponse = (response) => {
//   if (response.ok) {
//     return response.json();
//   } else {
//     let error = new Error(response.statusText);
//     error.response = response;
//     console.log(error);
//   }
// }

// export const addCart = (product) => {
//   return {
//     type: ADD_PRODUCT_CART,
//     product
//   }
// }

// export const saveCart = (data) => {
//   return (dispatch, getState) => {
	
// 	const { _id } = getState().auth;
	
//     return fetch('/api/carts', {
//       			credentials: "include",
//       			method: "POST",
//       			headers: { "Content-Type": "application/json" },
// 		      	body: JSON.stringify(data, _id)
//     	    })
//     		.then(handleResponse)
//     		.then(data => dispatch({ type: ADD_PRODUCT_CART, payload: data }))
//   }
// }

// export const setProductsLoading = () => ({
//     type: LOADING_PRODUCTS
// });

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

export const fetchCartItems = () => async (dispatch) => {
	
	try {
		const response = await axios.get('/api/carts');
		
		dispatch({ 
			type: FETCH_CART_ITEMS,  
			payload: response.data 
		});
	} catch(err) {	
		console.log(err);
	}
}

// Fetch Cart Items By User Id
export const fetchCartByUser = (uid) => async (dispatch, getState) => {
	
	const { _id } = getState().auth;
	// console.log("fetchCartByUser", _id);
	
	try {
		const response = await axios.get(`/api/carts/${_id}`);
		
		dispatch({ 
			type: FETCH_CART_BY_USER, 
			payload: response.data 
		});
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

