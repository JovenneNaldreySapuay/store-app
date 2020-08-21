const express = require('express');
const mongoose = require('mongoose');
const formData = require('express-form-data');
const cloudinary = require('cloudinary');
const jwt = require("jsonwebtoken");
const async = require('async');

const requireAuthenticate = require('../middlewares/requireAuthenticate');
const requireAdminRole = require('../middlewares/requireAdminRole');

const Notification = mongoose.model('notification');

const validate = (data) => {
  let errors = {};
  if (data.productIds === '') errors.productIds = "Server error: Can't be empty";
  // if (data.cover === '') errors.cover = "Can't be empty";
  const isValid = Object.keys(errors).length === 0;
  
  return { errors, isValid };
}

module.exports = app => {
		
	// Saving data
	app.post('/api/notifications', requireAuthenticate, async (req, res) => {
		    
	    const { errors, isValid } = validate(req.body);

		console.log("Notification Form Values:", req.body.values);

		const { productIds, _userid } = req.body.values;
				
		if (isValid) {			
			try {

				const notification = new Notification(
					{ 
						productIds, 
						_userid,
					}
				);

				await notification.save();

			} catch (err) {

				res.status(422).send(err);

			}
		} else {

			res.status(400).json({ errors });
		}
	});

	// Fetch All Notifications
	app.get('/api/notifications', async (req, res) => {

		await Notification
			.find().
			exec(function (err, data) {
				if (err) console.error(err);
				res.send(data);
			});
	});

	// Fetch Notification by User id
	app.get('/api/notifications/:_user', async (req, res) => {
		
		const { _user } = req.params;
		
		// Update to .find() since this might be an array
		await Notification
		.findOne({
			_userid: _user
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

