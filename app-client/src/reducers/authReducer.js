import { 
	USER_LOGGED_IN,
	USER_LOGGED_OUT
} from '../actions/types';

const INITIAL_STATE = {
	users: []
};

export default function(state = INITIAL_STATE, action) {

	switch (action.type) {
	    case USER_LOGGED_IN:
	    	// console.log("USER_LOGGED_IN", action.payload );
	    	return action.payload;
	    	break; // eslint-disable-line no-unreachable

	    case USER_LOGGED_OUT:
	    	return {};	
	    	break; // eslint-disable-line no-unreachable

		default:
			return state;
			break; // eslint-disable-line no-unreachable
	}
}
