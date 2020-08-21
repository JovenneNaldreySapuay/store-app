import React from 'react';
		
const OrderedItem = ({ handleReviewNotification, item }) => {
		
	return (
		<form onSubmit={handleReviewNotification} id={item._id}>
			<input
			style={{width: '100%', display: 'block'}} 
			type="text" name="userid" value={item._user || ""} readOnly />
			<input
			style={{width: '100%', display: 'block'}} 
			type="text" name="productid" value={item._product || ""} readOnly />
			<input
			style={{width: '100%', display: 'block'}} 
			type="text" name="title" value={item.title || ""} readOnly />
			<button
			className="bg-red-500 text-white py-1 px-2" 
			type="submit">Send Review Product Notification</button>
		</form>
	
	);
};

export default OrderedItem;