import { 
	ADD_TO_CART_SUCCESS, 
	DELETE_PRODUCT_CART,
	FETCH_CART_BY_USER, 
	FETCH_CART_ITEMS,
	// FETCH_CHECKOUT_PRODUCTS_BY_USER,
	/// FETCH_PRODUCTS_CART, 
} from '../actions/types';

const INITIAL_STATE = {
	items: []
};

// Review this later. Helpful for this section...
// https://stackoverflow.com/questions/49604096/react-redux-shopping-cart-decrease-increase-item-quantity		

// console.log("calling ADD_PRODUCT_CART reducer...");
// console.log("ADD_PRODUCT_CART payload:", action.payload);
// console.log("Old state:", state.items);

// const product_id_payload = action.payload._product;
// // let product = [];
// const findId = state.items.filter(item => console.log("ID:", item._product));

// console.log("Finding ID:", findId);
// console.log("Product ID from payload:", product_id_payload);

export default function(state = INITIAL_STATE, action) {

	switch (action.type) {

		case ADD_TO_CART_SUCCESS: 
		console.log("ADD_TO_CART_SUCCESS payload:", action);
		// return { 
		// 	...state,
		// 	items: [...state.items, action.payload]
		// };		

		return Object.assign({}, state, {
			items: [...state.items, action.payload]
		});
		break; // eslint-disable-line no-unreachable		

		case FETCH_CART_BY_USER:
		return {
			...state,
			items: action.payload
		};
		break; // eslint-disable-line no-unreachable

		case FETCH_CART_ITEMS:
		return {
			...state,
			items: action.payload
		};
		break; // eslint-disable-line no-unreachable

		case DELETE_PRODUCT_CART:  
		// console.log("DELETE_PRODUCT_CART ID:", action.payload);	
		return {
			...state,
			items: state.items.filter(product => product._id !== action.payload)
		};	
		break; // eslint-disable-line no-unreachable

		default:
			return state;
			break; // eslint-disable-line no-unreachable
		}
	}
