const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema(
	{
		message: { 
			type: String, 
			required: true 
		},
		star: { 
			type: String, 
			required: true 
		},
		name: { 
			type: String, 
			required: true 
		},
		_product: { 
			type: Schema.Types.ObjectId, 
			ref: 'product' 
		},
		_user: { 
			type: Schema.Types.ObjectId, 
			ref: 'user' 
		}
	}, { timestamps: true }
);

module.exports = mongoose.model('review', reviewSchema);

