const mongoose = require('mongoose');
const { Schema } = mongoose;

const formSchema = new Schema(
	{
		assets: [String],
		gender: { 
			type: String, 
			required: true 
		},
		category: { 
			type: String, 
			required: true 
		},		
	}, { timestamps: true }
);

module.exports = mongoose.model('form', formSchema);


