import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import authReducer from './authReducer';
import userReducer from './userReducer';
import productReducer, * as fromProduct from './productReducer';
import cartReducer, * as fromCart from './cartReducer';
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


export const selectProductItems = (state) => fromProduct;
export const selectCartItems = (state) => fromCart;

export const getCartItems = createSelector(
  selectProductItems, 
  selectCartItems,
  (products, carts) => products.map(product => console.log(product))
);




