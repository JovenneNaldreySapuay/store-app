const express = require('express');
const mongoose = require('mongoose');
const formData = require('express-form-data');
const cloudinary = require('cloudinary');
const jwt = require("jsonwebtoken");
const async = require('async');

const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

const requireAuthenticate = require('../middlewares/requireAuthenticate');
const requireAdminRole = require('../middlewares/requireAdminRole');

const Product = mongoose.model('product');
const Cart = mongoose.model('cart');
const Checkout = mongoose.model('checkout');
const User = mongoose.model('user');

const validate = (data) => {
  let errors = {};
  if (data.shipping_option === '') errors.shipping_option = "Server error: Can't be empty";
  // if (data.cover === '') errors.cover = "Can't be empty";
  const isValid = Object.keys(errors).length === 0;
  
  return { errors, isValid };
}

module.exports = app => {
		
	// Saving data
	app.post('/api/checkouts', async (req, res) => {
		    
	    const { errors, isValid } = validate(req.body);

		console.log("Checkout Form Values:", req.body);
				
		const { 
			products, // array of items
			shipping_option,
			payment_method,
			message,
			shipping_fee,
			quantity,
			total,
			userid,
			email
		} = req.body.values;

		const paymentIntent = await stripe.paymentIntents.create({
			amount: total * 100,
			currency: 'usd',
			receipt_email: email,
			// description: 'Shopeeh Payment',
			// shipping: shipping_fee,
			// metadata: { integration_check: 'accept_a_payment' },
		});

		res.json({'client_secret': paymentIntent['client_secret']})	

		// console.log("paymentIntent", paymentIntent);
				
		if (isValid) {		

		try {
			const checkoutItem = new Checkout({ 
				products, 
				shipping_option,
				payment_method,
				message,
				shipping_fee,
				quantity,
				total,
				_user: userid,
				paymentid: paymentIntent.id
			});

			console.log("Checkedout Item:", checkoutItem);

			checkoutItem.save(async (err, docs) => {
				console.log("Docs after Checkedout:", docs);

				if (err) return console.error(err);

				// remove cart items for this user after checked out...
				await Cart.deleteMany({ userid: docs._user }, (err) => {
					if (! err) {
						console.log('Cart item(s) deleted successfully!');
					} else {
						console.err('Error:', err);
					}
				});

				// remove _cart referenced ID's after checkout...
				// await User.updateOne({ _id: docs._user }, { $set : { _cart: [] } });

				const checkedOutProducts = docs.products;

				async.eachSeries(checkedOutProducts, function iteratee (obj, done) {
				
					console.log("Checked Out Result:", obj);

					const checkoutQty = obj.quantity;

					Product.find({ _id: obj.productid }, function (err, docs) {
						
						console.log("------- PROCESSING BEGINS -------");
						
						console.log("Product docs cb is:", docs);
						console.log("Checked out product ID:", obj.productid);
						console.log("Current Stocks in DB:", docs[0].stock);
						console.log("Checked out Quantity:", obj.quantity);

						const updatedStock = docs[0].stock - checkoutQty;
					
						console.log("New Stocks:", updatedStock);

						Product.updateOne({	_id: obj.productid }, 
						{ $set : { stock: updatedStock } }, done);

						console.log("------- PROCESSING ENDS -------");
					})
				}, function allDone (err) {});				
			});	

			res.json(checkoutItem);
									
		} catch (err) { console.log(err) }

	} else { res.status(400).json({ errors }) }
	});

	// Fetch All Checkout Products
	app.get('/api/checkouts', async (req, res) => {
		await Checkout
			.find().
			exec(function (err, data) {
				if (err) console.error(err);
				res.json(data);
			});
	});

	// Fetch Checkout Products By User Id
	app.get('/checkouts/user/:_user', async (req, res) => {

		const { _user } = req.params;

		// console.log("Checkout", req.params);
		
		await Checkout
			.find({
				_user: new mongoose.Types.ObjectId(_user)
			}).
			exec(function (err, data) {
				if (err) console.error(err);
				res.json(data);
			});
	});

	// Fetch Checkout Products By _id
	app.get('/checkouts/transaction/:_id', async (req, res) => {

		const id = req.params._id;

		await Checkout
			.findOne({
				_id: new mongoose.Types.ObjectId(id)
			}).
			exec(function (err, data) {
				if (err) console.error(err);
				res.json(data);
			});
	});
};

