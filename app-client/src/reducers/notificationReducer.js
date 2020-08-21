import { 
	ADD_NOTIFICATION,
	FETCH_NOTIFICATIONS_BY_USER
} from '../actions/types';

const INITIAL_STATE = {
	items: [],
	item: {}
};

export default function(state = INITIAL_STATE, action) {

	switch (action.type) {

		case ADD_NOTIFICATION: 		
			return { 
				...state, 
				items: [...state.items, action.payload] 
			};

		case FETCH_NOTIFICATIONS_BY_USER: 		
			return { 
				...state, 
				item: action.payload
			};

		default:
			return state;
	}

}