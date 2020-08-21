import { 
	ADD_USER,
	FETCH_USER,
	FETCH_USERS,
	UPDATE_USER,
	DELETE_USER
} from '../actions/types';

const INITIAL_STATE = {
	items: [],
	item: {}
};

export default function(state = INITIAL_STATE, action) {

	switch (action.type) {	
		case ADD_USER: 		
			return { 
				...state, 
				item: action.payload 
			};
			
		case FETCH_USER: 
			return { 
				...state, 
				item: action.payload 
			};
	    		
		case FETCH_USERS:
			return {
				...state,
				items: action.payload
			};
		
		case UPDATE_USER: 
			return { 
				...state, 
				item: action.payload 
			};

		case DELETE_USER: 			
			return {
				...state,
				items: state.items.filter(user => user._id !== action.payload)
			};

		default:
			return state;
	}
}
