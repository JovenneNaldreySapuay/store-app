const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema(
	{
		userid: { 
			type: Schema.Types.ObjectId, 
			ref: 'user' 
		},
		email: { 
			type: String, 
			required: true 
		},
		payment_id: { 
			type: String, 
			required: true 
		},
		amount: { 
			type: Number, 
			required: true
		},		
	}, { timestamps: true }
);

module.exports = mongoose.model('payment', paymentSchema);

