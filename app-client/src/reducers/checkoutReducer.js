import { 
	ADD_CHECKOUT_PRODUCT, 
	FETCH_CHECKOUT_PRODUCTS_BY_ID,
	FETCH_CHECKOUT_PRODUCTS_BY_USER,
	FETCH_CHECKOUT_PRODUCTS
} from '../actions/types';

const INITIAL_STATE = {
	items: [],
	item: {}
};

export default function(state = INITIAL_STATE, action) {

	switch (action.type) {

		case ADD_CHECKOUT_PRODUCT: 		
			return { 
				...state, 
				item: action.payload 
			};

		case FETCH_CHECKOUT_PRODUCTS: 		
			return { 
				...state, 
				items: action.payload 
			};

		case FETCH_CHECKOUT_PRODUCTS_BY_USER:	
			return {
				...state,
				items: action.payload
			};	

		case FETCH_CHECKOUT_PRODUCTS_BY_ID:	
			return {
				...state,
				item: action.payload
			};	

	    default:
			return state;
	}
}
