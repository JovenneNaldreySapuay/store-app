import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import decode from 'jwt-decode';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import * as serviceWorker from './serviceWorker';

import './style.css';

import { fetchProducts } from './actions/product'; // added 8/7/2020
import { userLoggedIn } from './actions/auth';

import rootReducer from './reducers'; 
import setAuthorizationHeader from './utils/setAuthorizationHeader';
import App from './components/App';

window.axios = axios;

const middleware = [ reduxThunk ];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

// Redux store
// const initialState = {};

// orig code
// const store = createStore(
// 	rootReducer, 
// 	initialState, 
// 	composeWithDevTools(
// 		applyMiddleware(reduxThunk)
// 	)
// );

// updated above 8/7/2020
const store = createStore(
	rootReducer, 
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
}

// added 8/7/2020
store.dispatch(fetchProducts());

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>	
			<Route component={App} />
		</BrowserRouter>	
	</Provider>,
	document.querySelector('#root')
);

// store.subscribe(() => {
// 	console.log("Redux Store Changed!", store.getState());
// });

// console.log("Redux store:", store.getState());

// const render = () => {
// 	ReactDOM.render(
// 		<Provider store={store}>
// 			<BrowserRouter>	
// 				<TestRedux comments={store.getState().comment} />
// 			</BrowserRouter>	
// 		</Provider>,
// 		document.querySelector('#root')
// 	);
// };

// TODO: Know how subscribe() works, this is only experiment remove 
// `const render declaration` above if not working
// code from dan abramov egghead redux video 17
// store.subscribe(render);
// render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
