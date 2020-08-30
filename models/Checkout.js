const mongoose = require('mongoose');
const { Schema } = mongoose;

const checkoutSchema = new Schema(
	{
		products: [{}],
		shipping_option: { 
			type: String, 
			required: true 
		},
		payment_method: { 
			type: String, 
			required: true 
		},
		message: { 
			type: String 
		},
		shipping_fee: { 
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
		_user: { 
			type: Schema.Types.ObjectId, 
			ref: 'user' 
		},
		paymentid: { 
			type: String, 
			required: true 
		},
	}, { timestamps: true }
);

module.exports = mongoose.model('checkout', checkoutSchema);

