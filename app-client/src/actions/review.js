import axios from 'axios';
import { 
	ADD_PRODUCT_REVIEW,
	FETCH_REVIEWS_BY_PRODUCT_ID,
} from './types';

// Add product review
// @route - /api/reviews
export const addReview = (values) => async (dispatch, getState) => {

	try {
		const response = await axios.post('/api/reviews', { values });
		
		dispatch({ 
			type: ADD_PRODUCT_REVIEW, 
			payload: response.data 
		});

	} catch(err) {
		console.log(err);
	}
}

// Fetch all reviews by product id
// @route - /product/reviews/:id
export const fetchReviewsByProductId = (pid) => async (dispatch) => {

	try {
		const response = await axios.get(`/product/reviews/${pid}`);
		
		dispatch({ 
			type: FETCH_REVIEWS_BY_PRODUCT_ID, 
			payload: response.data 
		});
	} catch(err) {	
		console.log(err);
	}
}