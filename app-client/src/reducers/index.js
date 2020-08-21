import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import checkoutReducer from './checkoutReducer';
import reviewReducer from './reviewReducer';
import notificationReducer from './notificationReducer';

import formReducer from './formReducer';

export default combineReducers({
	auth: authReducer,
	user: userReducer,
	product: productReducer,
	cart: cartReducer,
	checkout: checkoutReducer,
	review: reviewReducer,
	notification: notificationReducer,
	form: formReducer,
});

