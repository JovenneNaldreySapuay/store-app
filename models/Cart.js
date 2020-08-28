const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema(
	{
		title: { 
			type: String, 
			required: true 
		},
		slug: { 
			type: String, 
			required: true 
		},
		image: { 
			type: String, 
			required: true 
		},
		price: { 
			type: Number, 
			required: true
		},
		quantity: { 
			type: Number, 
			required: true
		},
		total: { 
			type: Number, 
			required: true
		},
		productid: { 
			type: Schema.Types.ObjectId, 
			ref: 'product' 
		},
		userid: { 
			type: Schema.Types.ObjectId, 
			ref: 'user' 
		},
	}, { timestamps: true }
);

module.exports = mongoose.model('cart', cartSchema);


/*
const cartSchema = new Schema(
	{
		productid: { 
			type: Schema.Types.ObjectId, 
			ref: 'product' 
		},
		quantity: {
			type: Number, 
			required: true
		},
		userid: { 
			type: Schema.Types.ObjectId, 
			ref: 'user' 
		},
	}, { timestamps: true }
);

module.exports = mongoose.model('cart', cartSchema);
*/

