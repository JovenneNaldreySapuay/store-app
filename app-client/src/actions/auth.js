// import axios from 'axios';
import api from "../api";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "./types";

// TODO: Test these two login methods w/c will display error in the front-end

// export const login = (credentials) => async (dispatch) => {
// 	console.log("login thunk", api.user );
// 	await api.user.login(credentials).then(user => {

// 		console.log("login thunk", user );

// 		localStorage.bookwormJWT = user.token;
// 		setAuthorizationHeader(user.token);
// 		dispatch(userLoggedIn(user));
// 	});
// };

// export const login = (credentials) => async (dispatch) => {
// 	try {
// 		const res = await axios.post('/api/auth', { credentials });

// 	 	localStorage.bookwormJWT = res.data.user.token;
// 		setAuthorizationHeader(res.data.user.token);

// 		dispatch({
// 			type: USER_LOGGED_IN,
// 			payload: res.data.user
// 		});

// 	} catch(err) {
// 		if (err.response && err.response.data) {
// 			console.log(err.response.data.errors);
// 		}
// 	}
// };

export const userLoggedIn = (user) => ({
  type: USER_LOGGED_IN,
  payload: user,
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});

export const login = (credentials) => async (dispatch) => {
  await api.user.login(credentials).then((user) => {
    localStorage.bookwormJWT = user.token;
    setAuthorizationHeader(user.token);
    dispatch(userLoggedIn(user));
  });
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("bookwormJWT");
  setAuthorizationHeader();
  dispatch(userLoggedOut());
};

export const confirm = (token) => async (dispatch) => {
  await api.user.confirm(token).then((user) => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user));
  });
};

export const resetPasswordRequest = ({ email }) => async () => {
  await api.user.resetPasswordRequest(email);
};

export const validateToken = (token) => async () => {
  await api.user.validateToken(token);
};

export const resetPassword = (data) => async () => {
  await api.user.resetPassword(data);
};
