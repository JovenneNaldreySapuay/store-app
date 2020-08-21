import axios from 'axios';

import api from '../api';
import { userLoggedIn } from './auth';

import { 
	FETCH_USERS, 
	FETCH_USER, 
	UPDATE_USER } from './types';

// // Fetch all users
export const fetchUsers = () => async (dispatch) => {
	try {
		const response = await axios.get('/api/users');
		dispatch({ type: FETCH_USERS, payload: response.data });

	} catch(err) {	
		console.log(err);
	}
}

// // Fetch single user
export const fetchUser = (id) => async (dispatch) => {
	try {
		const response = await axios.get(`/api/users/${id}`);

		dispatch({ 
			type: FETCH_USER, 
			payload: response.data 
		});

	} catch(err) {
		console.log(err);
	}
}

export const updateUser = (data) => async (dispatch) => {
	try {
		await axios.put(`/api/users/${data._id}`, {
			data: data,
			headers: {
		    	"Content-Type": "application/json"
		    }
	 	});

		dispatch({
			type: UPDATE_USER,
			payload: data
		});
		
	} catch(err) {
		console.log(err);
	}
}

export const signup = (data) => async dispatch => {
	await api.user.signup(data).then(user => { 
		localStorage.bookwormJWT = user.token;
		dispatch(userLoggedIn(user));
	});
};

export const sendmail = (data) => async dispatch => {
	await api.user.sendmail(data).then(user => { 
		// localStorage.bookwormJWT = user.token;
		dispatch(userLoggedIn(user));
	});
};