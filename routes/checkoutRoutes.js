const express = require('express');
const mongoose = require('mongoose');
const formData = require('express-form-data');
const cloudinary = require('cloudinary');
const jwt = require("jsonwebtoken");
const async = require('async');

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
	app.post('/api/checkouts', requireAuthenticate, async (req, res) => {
		    
	    const { errors, isValid } = validate(req.body);

		console.log("Checkout Form Values:", req.body.values);

	    const prod_id = req.body.values._id; 
		const userid = req.body.user._id; 

		const { 
			products,
			shipping_option,
			payment_method,
			message,
			shipping_fee,
			quantity,
			total
		} = req.body.values;
				

		if (isValid) {			
			try {

				const checkoutItem = new Checkout(
					{ 
						products, 
						shipping_option,
						payment_method,
						message,
						shipping_fee,
						quantity,
						total,
						_user: userid
					}
				);
				
				await checkoutItem.save(async (err, docs) => {
					console.log("Docs after checkout:", docs);

					if (err) return console.error(err);

					// remove cart items for this user after checked out...
					await Cart.deleteMany({ _user: docs._user }, (err) => {
						if (! err) {
							console.log('Cart Item Deleted successfully!');
						} else {
							console.err('Error:', err);
						}
					});

					// remove _cart referenced ID's after checkout...
					await User
							.updateOne({ _id: docs._user }, 
								{ $set : { _cart: [] } });

					const checkedOutProducts = docs.products;

					async.eachSeries(checkedOutProducts, function iteratee (obj, done) {
						
						console.log("Checkout Result:", obj);

						const checkoutQty = obj.quantity;

						Product.find({ _id: obj._product }, function (err, docs) {
							console.log("------- PROCESSING BEGINS -------");
							console.log("Product callback is:", docs);
							console.log("Checked out product ID:", obj._product);
							console.log("Current Stock in DB:", docs[0].stock);
							console.log("Checked out Quantity:", obj.quantity);

							const updatedStock = docs[0].stock - checkoutQty;
							
							console.log("New Stock:", updatedStock);

							Product.updateOne({ 
								_id: obj._product 
							}, 
							{ 
								$set : { 
									stock: updatedStock 
								}
							}, done);

							console.log("------- PROCESSING ENDS -------");
						})

					}, function allDone (err) {
						
					});				
				});	

			} catch (err) {
				res.status(422).send(err);
			}
		} else {
			res.status(400).json({ errors });
		}
	});


	// Fetch All Checkout Products
	app.get('/api/checkouts', async (req, res) => {
		await Checkout
			.find().
			exec(function (err, data) {
				if (err) console.error(err);
				res.send(data);
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
				res.send(data);
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
				res.send(data);
			});
	});
};

