const express = require('express');
const mongoose = require('mongoose');
const formData = require('express-form-data');
const cloudinary = require('cloudinary');
const jwt = require("jsonwebtoken");

const requireAuthenticate = require('../middlewares/requireAuthenticate');
const requireAdminRole = require('../middlewares/requireAdminRole');

const Form = mongoose.model('form');

const validate = (data) => {
  let errors = {};
  if (data.category === '') errors.category = "Server error: Can't be empty";
  if (data.gender === '') errors.gender = "Server error: Can't be empty";
 
  const isValid = Object.keys(errors).length === 0;
  
  return { errors, isValid };
}

module.exports = app => {
	// Get all forms 
	app.get('/api/forms', async (req, res) => {
		await Form
			.find().
			exec(function (err, data) {
				if (err) { 
					res.status(500).json({ errors: { global: err }}); 
					return; 
				}

				res.json(data);
			});
	});

	// Get all forms 
	app.get('/api/forms/:_id', async (req, res) => {

		const { _id } = req.params;

		await Form
			.findOne({
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

};