import { 
    ADD_VISITOR,
    FETCH_VISITORS
} from '../actions/types';

const INITIAL_STATE = {
	items: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    
    case ADD_VISITOR:
		return {
			...state,
			items: [...state.items, action.payload]
		}

	case FETCH_VISITORS:
		return {
			...state,
			items: action.payload
		};


    default:
		return state;
  }
}





