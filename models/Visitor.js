const mongoose = require('mongoose');
const { Schema } = mongoose;

const visitorSchema = new Schema(
	{
		email: { 
			type: String, 
			required: true 
		},
		ip: { 
			type: String, 
			required: true 
		},
		country: { 
			type: String, 
			required: true 
		},
	}, { timestamps: true }
);

module.exports = mongoose.model('visitor', visitorSchema);

