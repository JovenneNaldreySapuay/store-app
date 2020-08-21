import { 
	ADD_PRODUCT,
	FETCH_PRODUCTS, 
	SEARCH_PRODUCTS,
	UPDATE_PRODUCT,
	DELETE_PRODUCT,
	FETCH_PRODUCTS_BY_CATEGORY,
	FETCH_SINGLE_PRODUCT,
	// FETCH_SINGLE_SHOP_PRODUCT, 
} from '../actions/types';

const INITIAL_STATE = {
	items: [],
	item: {}
};

export default function(state = INITIAL_STATE, action) {

	switch (action.type) {

		case ADD_PRODUCT: 		
			return { 
				...state, 
				items: [...state.items, action.payload] 
			};

		case FETCH_PRODUCTS:
			return {
				...state,
				items: action.payload
			};

		case FETCH_SINGLE_PRODUCT:
			return { 
				...state, 
				item: action.payload 
			};

		case SEARCH_PRODUCTS:
			return {
				...state,
				items: action.payload
			};

		case FETCH_PRODUCTS_BY_CATEGORY:
			return {
				...state,
				items: action.payload
			};

		case UPDATE_PRODUCT: 
			return { 
				...state, 
				item: action.data 
			};
			
		case DELETE_PRODUCT: 		
			return {
				...state,
				items: state.items.filter(product => product._id !== action.payload)
			};
    	
	    default:
			return state;
	}
}
