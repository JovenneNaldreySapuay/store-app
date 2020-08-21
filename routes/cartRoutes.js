const express = require('express');
const mongoose = require('mongoose');
const formData = require('express-form-data');
const cloudinary = require('cloudinary');
const jwt = require("jsonwebtoken");

const requireAuthenticate = require('../middlewares/requireAuthenticate');
const requireAdminRole = require('../middlewares/requireAdminRole');
const keys = require('../config/keys');

const User = mongoose.model('user');
const Product = mongoose.model('product');
const Cart = mongoose.model('cart');

const validate = (data) => {
  let errors = {};
  if (data.quantity === '') errors.quantity = "Server error: Can't be empty";
  // if (data.cover === '') errors.cover = "Can't be empty";
  const isValid = Object.keys(errors).length === 0;
  
  return { errors, isValid };
}

module.exports = app => {		
	// Saving data
	app.post('/api/carts', async (req, res) => {
		    
	    const { errors, isValid } = validate(req.body);
		
		const { 
			title,
			slug, 
			image,
			price,
			quantity,
			total,
			_product,
			_user
		} = req.body;
				
		console.log("cartRoutes.js from Form Values:", req.body);

		// @TODO: When adding to cart, save product _id to 
		// `User` model for relationship purpose
		// Use array .push() to `_cart property` in User Model

		if (isValid) {			
			try {
				// await Cart.find({ _product: _product }, async (err, docs) => {

					// if (docs.length === 0 || docs === undefined) {
					// 	// no record yet, perform adding new...
					// 	console.log('ID Not Found - Perform Adding Record...');
					// 	console.log("User who adds this item:", _user);
						
						const cartData = new Cart(
							{ 
								title,
								slug, 
								image,
								price,
								quantity,
								total,
								_product,
								_user,
							}
						);
						
						await cartData.save();

						console.log("New Item in Cart Model:", cartData);

						// call User model 
						/* Use this later if needed...
						User.findById({ _id: new mongoose.Types.ObjectId( userid )}, function (err, user) {
							user._cart.push(cartData);	
							user.save();
							console.log("Cart data added to User Model");
							res.status(201);
							res.json(cartData);
						})
						*/
					// } else {
					// 	// there's a record, perform updating...
						
					// 	console.log('ID Found - Perform Updating Record...');
					// 	console.log("User who updates this item:", _user);
					// 	console.log("From DB Qty:", docs[0].quantity, "From DB Total:", docs[0].total);
					// 	console.log("From Client Qty:", quantity, "From Client Total:", total);
						
					// 	const filter =  { 
					// 		_product: _product,
					// 		_user: _user  
					// 	};
					// 	const update = { 
					// 		quantity: +quantity + docs[0].quantity, 
					// 		total: total + docs[0].total
					// 	};
					// 	const config = { upsert: true };

					// 	await Cart.findOneAndUpdate(filter, update, config);

					// 	console.log("New Cart Record:", update);
						
					// } 
				// }).exec()

			} catch (err) {

				res.status(422).send(err);

			}

		} else {

			res.status(400).json({ errors });

		}
	});

	// update cart product
	app.put('/api/carts', requireAuthenticate, async (req, res) => {
		console.log("Cart .put Req:", req);		
	});

	// Fetch All Cart Items
	app.get('/api/carts', async (req, res) => {
		await Cart
		.find().
		exec(function (err, data) {
			if (err) console.error(err);
			
			res.send(data);
		});
	});

	// Fetch Cart Items By User ID
	app.get('/api/carts/:_user', async (req, res) => {
		
		const { _user } = req.params;
		
		await Cart
		.find({
			_user: _user
		}).
		exec(function (err, data) {
			if (err) { 
				res.status(500).json({ errors: { global: err }}); 
				return; 
			}

			res.json(data);
		});
	});

	// Delete Cart Item By Product Id
	app.delete('/api/carts/:id', async (req, res) => {
		
		// get cart unique _id
		let cid = req.params.id;

		console.log("Cart Product ID to delete:", cid);
		
		await Cart.findOneAndRemove({ 
			_id: new mongoose.Types.ObjectId(cid) 
		}, (err, docs) => {
			if (err) console.error(err);
			console.log("Product Deleted successfully", docs);
		}).exec(function (err, data) {
			if (err) console.error(err);
			res.send(data);
		});

		// Fetch All Cart Items
		app.get('/api/carts', async (req, res) => {
			await Cart
			.find().
			exec(function (err, data) {
				if (err) console.error(err);
				res.send(data);
			});
		});

		// await Cart.findOneAndRemove({ _product: product_id }, (err, docs) => {
				
				// if (err) console.error(err);
				
				// Optional... add this later if needed
				/*
				console.log("User ID to pass below:", docs._user);
				
				await User.findById({ _id: docs._user }, (err, user) => {
					console.log("User found:", user);

					const id = docs._id;

					console.log("Deleted id:", id);

					user._cart.remove(id);
					
					console.log("Product in User deleted!");

					user.save();

					res.json({ user });
				}).
				exec(); 
				*/
			// }).
			// exec(); // added since it causes issue when deleting (8/13/20)
	});

};

