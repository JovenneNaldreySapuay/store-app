const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema(
	{
		productIds: [String],
		_userid: { 
			type: Schema.Types.ObjectId, 
			ref: 'user' 
		}
	}, { timestamps: true }
);

module.exports = mongoose.model('notification', notificationSchema);

