const express = require('express');
const mongoose = require('mongoose');
const formData = require('express-form-data');
const cloudinary = require('cloudinary');
const jwt = require("jsonwebtoken");

const requireAuthenticate = require('../middlewares/requireAuthenticate');
const requireAdminRole = require('../middlewares/requireAdminRole');

const Review = mongoose.model('review');

const validate = (data) => {
  let errors = {};
  if (data.message === '') errors.message = "Server error: Can't be empty";
  // if (data.cover === '') errors.cover = "Can't be empty";
  const isValid = Object.keys(errors).length === 0;
  
  return { errors, isValid };
}

module.exports = app => {
		
	// Saving data
	app.post('/api/reviews', requireAuthenticate, async (req, res) => {
		
		// console.log("reviewRoutes.js values:", req.body.values);
			    
	    const { 
	    	errors, isValid 
	    } = validate(req.body);

		const { 
			message,
			star,
			name,
			productId,
			userid,
		} = req.body.values;

		if (isValid) {	

			try {
				const reviewData = new Review(
					{ 
						message,
						star,
						name,
						_product: productId,
						_user: userid
					}
				);

				await reviewData.save();
								
			} catch (err) {

				res.status(422).send(err);

			}

		} else {

			res.status(400).json({ errors });

		}
	});

	// Get all reviews 
	app.get('/api/reviews', async (req, res) => {
		await Review
			.find().
			exec(function (err, data) {
				if (err) { 
					res.status(500).json({ errors: { global: err }}); 
					return; 
				}

				res.json(data);
			});
	});


	// Get all reviews 
	app.get('/api/reviews', async (req, res) => {
		await Review
		.find().
		exec(function (err, data) {
			if (err) { 
				res.status(500).json({ errors: { global: err }}); 
				return; 
			}

			res.json(data);
		});
	});

	// Get all reviews by Product Id 
	app.get('/product/reviews/:_product', async (req, res) => {
		const { _product } = req.params;

		await Review
		.find({ 
			_product: new mongoose.Types.ObjectId(_product)
		}).
		exec(function (err, data) {
			if (err) { 
				res.status(500).json({ errors: { global: err }}); 
				return; 
			}

			res.json(data);
		});
	});

	
};

