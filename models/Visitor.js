const mongoose = require('mongoose');
const { Schema } = mongoose;

const visitorSchema = new Schema(
	{
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

