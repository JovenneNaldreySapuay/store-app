import { 
	FETCH_FORM,
	FETCH_FORMS,
} from '../actions/types';

const INITIAL_STATE = {
	items: [],
	item: {}
};

export default function(state = INITIAL_STATE, action) {

	switch (action.type) {
		
		case FETCH_FORMS:
			return {
				...state,
				items: action.payload
			};

		case FETCH_FORM:
			return {
				...state,
				item: action.payload
			};
    	
	    default:
			return state;
	}
}
