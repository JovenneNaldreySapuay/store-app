import axios from 'axios';
import { 
	ADD_VISITOR,
	FETCH_VISITORS,
} from './types';

export const saveVisitor = (values) => async (dispatch) => {
    
	try {
        const response = await axios.post('/api/visitors', { values });
        		
		dispatch({ 
			type: ADD_VISITOR, 
			payload: response.data 
        });
        
	} catch(err) {
		console.log(err);
	}
}

export const fetchVisitors = () => async (dispatch) => {
		
	try {
		const response = await axios.get('/api/visitors');
		
		dispatch({ 
			type: FETCH_VISITORS, 
			payload: response.data 
		});

		return response;

	} catch(err) {	
		console.log(err);
	}
}











