import { 
	ADD_PRODUCT_REVIEW,
	FETCH_REVIEWS_BY_PRODUCT_ID,
} from '../actions/types';

const INITIAL_STATE = {
	items: []
};

export default function(state = INITIAL_STATE, action) {

	switch (action.type) {

		case ADD_PRODUCT_REVIEW: 		
			return { 
				...state, 
				items: [...state.items, action.payload] 
			};

		case FETCH_REVIEWS_BY_PRODUCT_ID:
			return {
				...state,
				items: action.payload
			};

		default:
			return state;
	}

}