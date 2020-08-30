const express = require('express');
const mongoose = require('mongoose');
const formData = require('express-form-data');
const cloudinary = require('cloudinary');
const jwt = require("jsonwebtoken");

const requireAuthenticate = require('../middlewares/requireAuthenticate');
const requireAdminRole = require('../middlewares/requireAdminRole');

const Product = mongoose.model('product');
// const User = mongoose.model('user');

const validate = (data) => {
  let errors = {};
  if (data.title === '') errors.title = "Server error: Can't be empty";
  // if (data.cover === '') errors.cover = "Can't be empty";
  const isValid = Object.keys(errors).length === 0;
  
  return { errors, isValid };
}

module.exports = app => {
		
	// Saving data
	app.post('/api/products', requireAuthenticate, async (req, res) => {
		
		console.log("productRoutes.js values:", req.body.values);
		// console.log("productRoutes.js body.user():", req.body);
	    
	    const { 
	    	errors, isValid 
	    } = validate(req.body);

		const { 
			title, 
			slug,
			description, 
			price, 
			category,
			rating,
			stock, 
			image 
		} = req.body.values;
		
		const { 
			user: { _id } 
		} = req.body;

	    // console.log("Logged User ID:", _id);
	    // console.log("errors:", errors );    
	
		// this code is working but need to improve!
		if (isValid) {			
			try {
				const productData = new Product(
					{ 
						title, 
						slug,
						description, 
						price, 
						category,
						rating,
						stock, 
						image, 
						_user: _id
					}
				);

				await productData.save();
				
				res.json(productData);

				// call User model
				/*
				User.findById({ _id: new mongoose.Types.ObjectId( _id )}, function (err, data) {
					
					data.posts.push(productData);	
					data.save();
					 
					res.status(201);
					res.json(productData);
				})
				*/
				
			} catch (err) {
				res.status(422).send(err);
			}
		} else {
			res.status(400).json({ errors });
		}
	});

	// Get all products 
	app.get('/api/products', async (req, res) => {
		await Product
			.find().
			exec(function (err, data) {
				if (err) { 
					res.status(500).json({ errors: { global: err }}); 
					return; 
				}

				res.json(data);
			});
	});

	// Searching product 
	app.get('/products/search/:q', async (req, res) => {

		// console.log("Req Query", req);

		const { q } = req.params;

		await Product
			.find({
				title: { $regex: q, $options: 'i' }
			}).
			exec(function (err, data) {
				if (err) { 
					res.status(500).json({ errors: { global: err }}); 
					return; 
				}

				res.json(data);
			});
	});

	// Note /:_id or /:category is the exact property name in DB
	app.get('/api/products/:_id', async (req, res) => {

		const { _id } = req.params; 
		
		await Product.
			findById({ 
				_id: new mongoose.Types.ObjectId(_id)
			}).
			exec(function (err, data) {
				if (err) { 
					res.status(500).json({ errors: { global: err }}); 
					return; 
				}

				res.json(data);
			});
	});

	// get products slug and id
	// app.get('/products/:_id', async (req, res) => {
	// 	const { _id } = req.params;
		
	// 	// console.log("Single Product", req.params);
				
	// 	await Product.
	// 		findById({ 
	// 			_id: new mongoose.Types.ObjectId(_id)
	// 		}).
	// 		exec(function (err, data) {
	// 			if (err) { 
	// 				res.status(500).json({ errors: { global: err }}); 
	// 				return; 
	// 			}

	// 			res.json(data);
	// 		});
	// });

	// Get all products by category 
	app.get('/products/:category', async (req, res) => {
		const { category } = req.params;
		
		await Product
			.find({
				category: category
			}).
			exec(function (err, data) {
				if (err) { 
					res.status(500).json({ errors: { global: err }}); 
					return; 
				}

				res.json(data);
			});
	});
	
	// Updating data
	app.put('/api/products/:_id', async (req, res) => {

		const { 
			title, 
			description,
			slug,
			price,
			category,
			stock 
		} = req.body.data; 

		await Product.findOneAndUpdate({ 
		    	_id: new mongoose.Types.ObjectId(req.params._id)
		    }, 
			{ $set: { 
				title, 
				description,
				slug,
				price,
				category,
				stock 
			}}, 
			{ 
				upsert: true 
			}, 
			(err, data) => {
				res.status(201);
				res.json(data);
			}
		);
	});

	app.delete('/api/products/:_id', async (req, res) => {
		await Product.deleteOne({ 
			_id: new mongoose.Types.ObjectId(req.params._id) 
		}, (err, data) => {
			res.json(data);
		});
	});

	app.post('/api/upload', async (req, res) => {
		const file = req.files.file.path;
		const result = await cloudinary.uploader.upload(file);	
		// console.log("/api/upload", result );	
		res.json(result);
	});
};

