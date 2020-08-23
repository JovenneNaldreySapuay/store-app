import React, { Component } from 'react';
import { 
	BrowserRouter, 
	Route, 
	Switch 
} from 'react-router-dom';
import { connect } from 'react-redux';
// import * as actions from '../actions';

import { 
	addProduct, 
	fetchSingleShopProduct, 
	fetchSingleProduct,
	fetchProducts 
} from '../actions/product';

import { 
	addProductCart, 
	fetchProductsCart, 
	fetchCartByUser,
	deleteProductCart 
} from '../actions/cart';

import {addReview} from '../actions/review';

import FormDemo from './FormDemo';
import FormDemoEdit from './FormDemoEdit';

import AdminRoute from './AdminRoute';
import GuestRoute from './GuestRoute';

import Header from './Header';
import Dashboard from './Dashboard';
import HomePage from './home/HomePage';

import MyPurchase from './MyPurchase';

import WomenCategory from './WomenCategory';
import MenCategory from './MenCategory';
import GadgetCategory from './GadgetCategory';

import Notifications from './Notifications';

import FeedbackContainer from './FeedbackContainer';
import Transactions from './Transactions';
import TransactionView from './TransactionView';

import AbandonedCart from './AbandonedCart';

import EditProduct from './EditProduct';
import AccountPage from './AccountPage';
import ProfileForm from './ProfileForm';

import Shop from './shop/Shop';
import Admin from './admin/Admin';

import SignupPage from './signup/SignupPage';
import LoginPage from './login/LoginPage';

import ManageRole from './user/ManageRole';
import EditRole from './user/EditRole';

import ConfirmationPage from './ConfirmationPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import ResetPasswordPage from './ResetPasswordPage';

import AddProduct from './AddProduct';
import Product from './Product';
import Products from './Products';

import CartPage from './cart/CartPage';
import CheckoutPage from './checkout/CheckoutPage';

import Footer from './footer/Footer';

class App extends Component {
  render() {
    return (
    	<BrowserRouter>	
		    <div id="app">
				<Header />
	    		
	    		<main id="main">
		    		<Switch>			    	
				    	<AdminRoute exact path="/demo" component={FormDemo} />
				    	<AdminRoute exact path="/demo/:_id" component={FormDemoEdit} />
				    	
				    	<AdminRoute exact path="/dashboard" component={Dashboard} />
				    	<AdminRoute exact path="/admin" component={Admin} />
				    	<AdminRoute exact path="/admin/abandoned-cart" component={AbandonedCart} />
				    	<AdminRoute exact path="/admin/transactions" component={Transactions} />
				    	<AdminRoute exact path="/admin/transactions/:_id" component={TransactionView} />

				    	<AdminRoute exact path="/users" component={ManageRole} />
				    	<AdminRoute exact path="/users/:_id" component={EditRole} />
				   
						<AdminRoute exact path="/reset_password/:token" component={ResetPasswordPage} />

				    	<AdminRoute exact path="/admin/products" component={Products} />
						<AdminRoute strict path="/admin/products/new" component={AddProduct} />				    	
				    	<AdminRoute exact path="/admin/products/:_id" component={EditProduct} />
				    	
				    	<AdminRoute exact path="/product/:_id/feedback" component={FeedbackContainer} />
				    	
				    	<AdminRoute exact path="/account" component={AccountPage} />
				    	<AdminRoute strict path="/account/my-purchase" component={MyPurchase} />
				    	<AdminRoute strict path="/account/notifications" component={Notifications} />
				    	<AdminRoute exact path="/account/:_id" component={ProfileForm} />

				    	<AdminRoute exact path="/cart" component={CartPage} />
				    	<AdminRoute exact path="/checkout" component={CheckoutPage} />
				    	
				    	<GuestRoute exact path="/signup" component={SignupPage} />
				    	<GuestRoute exact path="/login" component={LoginPage} />
				    	<GuestRoute exact path="/forgot_password" component={ForgotPasswordPage} />
				    	<GuestRoute exact path="/reset_password/:token" component={ResetPasswordPage} />
						
				    	<Route exact path="/" component={HomePage} />
						<Route exact path="/shop" component={Shop} />
						<Route exact path="/shop/:slug/:_id" component={Product} />
						
						<Route exact path="/shop/men" component={MenCategory} />
				    	<Route exact path="/shop/women" component={WomenCategory} />
				    	<Route exact path="/shop/gadgets" component={GadgetCategory} />

				    	<Route exact path="/confirmation/:token" component={ConfirmationPage} />
				    </Switch>
			    </main>
			    <Footer />
		    </div>
	    </BrowserRouter>
    );
  }
}

export default connect(null, 
	{ 
		addProduct,
		fetchSingleProduct,
		fetchProducts,
		fetchSingleShopProduct, 
		addProductCart,
		fetchProductsCart,
		fetchCartByUser,
		deleteProductCart,
		addReview
	}
	)(App);


