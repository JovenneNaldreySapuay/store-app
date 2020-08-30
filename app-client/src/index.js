import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import decode from 'jwt-decode';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import * as serviceWorker from './serviceWorker';
import '@stripe/stripe-js';

import './style.css';

import setAuthorizationHeader from './utils/setAuthorizationHeader';
import rootReducer from './reducers'; 
import { userLoggedIn } from './actions/auth';
import { fetchProducts } from './actions/product'; 
import App from './components/App';

window.axios = axios;

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger({ collapsed: true }));
}

const initialState = {};

export const store = createStore(
				rootReducer, 
				initialState, 
				applyMiddleware(...middleware)
			  );

if (localStorage.bookwormJWT) {
	const payload = decode(localStorage.bookwormJWT); 
	
	const user = { 
		_id: payload._id,
		fullName: payload.fullName, 
		email: payload.email, 
		role: payload.role, 
		phone: payload.phone,
		address: payload.address,
		city: payload.city,
		province: payload.province,
		country: payload.country,
		zipcode: payload.zipcode,
		confirmed: payload.confirmed, 
		token: localStorage.bookwormJWT 
	};
	setAuthorizationHeader(localStorage.bookwormJWT);

	store.dispatch(userLoggedIn(user));

	// load all products in every components
	store.dispatch(fetchProducts());
}


ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>	
			<Route component={App} />
		</BrowserRouter>	
	</Provider>,
	document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();