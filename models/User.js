const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');
const keys = require('../config/keys');

const userSchema = new Schema(
	{
		email: { 
			type: String, 
			required: true, 
			lowercase: true, 
			unique: true 
		},
		passwordHash: { 
			type: String, 
			required: true 
		},
		fullName: { 
			type: String, 
			required: true 
		},		
		phone: { 
			type: String, 
			required: false,
			default: ""
		},	
		address: { 
			type: String, 
			required: false,
			default: ""
		},	
		city: { 
			type: String, 
			required: false,
			default: ""
		},	
		province: { 
			type: String, 
			required: false,
			default: "" 
		},	
		country: { 
			type: String, 
			required: false,
			default: ""
		},	
		zipcode: { 
			type: String, 
			required: false,
			default: ""
		},	
		role: { 
			type: String, 
			default: "user" 
		},
		confirmed: { 
			type: Boolean, 
			default: false 
		},
		confirmationToken: { 
			type: String, 
			default: "" 
		} 
	}, { timestamps: true }
);

userSchema.methods.isValidPassword = function isValidPassword(password) {
	return bcrypt.compareSync(password, this.passwordHash);
};

userSchema.methods.setPassword = function setPassword(password) {
	this.passwordHash = bcrypt.hashSync(password, 10);
};

userSchema.methods.setConfirmationToken = function setConfirmationToken() {
	this.confirmationToken = this.generateJWT();
};

userSchema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
	return `${keys.host}/confirmation/${this.confirmationToken}`;
};

userSchema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
	return `${keys.host}/reset_password/${this.generateResetPasswordToken()}`;
};

userSchema.methods.generateJWT = function generateJWT() {
	return jwt.sign(
		{
			_id: this._id,
			fullName: this.fullName,
			email: this.email,
			role: this.role,
			phone: this.phone,
			address: this.address,
			city: this.city,
			province: this.province,
			country: this.country,
			zipcode: this.zipcode,
			confirmed: this.confirmed
		},
		keys.jwtSecret
	);
};

userSchema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
	return jwt.sign(
		{
			_id: this._id
		},
		keys.jwtSecret,
		{ expiresIn: "1h" }
	);
};

userSchema.methods.toAuthJSON = function toAuthJSON() {
	return {
		_id: this._id,
		fullName: this.fullName,
		email: this.email,
		role: this.role,
		phone: this.phone,
		address: this.address,
		city: this.city,
		province: this.province,
		country: this.country,
		zipcode: this.zipcode,
		confirmed: this.confirmed,
		token: this.generateJWT()
	};
};

userSchema.plugin(uniqueValidator, { message: "This email is already taken" });

module.exports = mongoose.model('user', userSchema);


