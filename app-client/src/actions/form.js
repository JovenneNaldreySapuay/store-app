import axios from 'axios';
import { 
	FETCH_FORMS,
	FETCH_FORM,
} from './types';

// ------------------ DEMO -----------------------

// @route - /api/forms
export const fetchForms = () => async (dispatch) => {
		
	try {
		const response = await axios.get('/api/forms');
		
		dispatch({ 
			type: FETCH_FORMS, 
			payload: response.data 
		});
	} catch(err) {	
		console.log(err);
	}
}

// @route - /api/forms/:_id
export const fetchForm = (id) => async (dispatch) => {
		
	try {
		const response = await axios.get(`/api/forms/${id}`);
		
		dispatch({ 
			type: FETCH_FORM, 
			payload: response.data 
		});
	} catch(err) {	
		console.log(err);
	}
}