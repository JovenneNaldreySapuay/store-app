import axios from 'axios';
import { 
	ADD_NOTIFICATION,
	FETCH_NOTIFICATIONS_BY_USER
} from './types';

// @route - /api/notifications
export const addNotification = (values) => async (dispatch) => {

	try {
		const response = await axios.post('/api/notifications', { values });
		
		dispatch({ 
			type: ADD_NOTIFICATION, 
			payload: response.data 
		});

	} catch(err) {
		console.log(err);
	}
}

// Fetch Notifications By User Id
// @route - /api/notifications/:_user
export const fetchNotificationByUser = (uid) => async (dispatch, getState) => {
	
	const { _id } = getState().auth;
	
	try {
		const response = await axios.get(`/api/notifications/${_id}`);
		
		dispatch({ 
			type: FETCH_NOTIFICATIONS_BY_USER, 
			payload: response.data 
		});
	} catch(err) {	
		console.log(err);
	}
}