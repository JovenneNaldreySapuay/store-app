import React from 'react';

const FeedbackForm = ({ handleOnSubmit, handleOnChange }) => {
	
	return (
	 	<form onSubmit={handleOnSubmit} className="mt-5">
	 		<div>
				<label 
				htmlFor="message" 
				>Message
				</label>

				<textarea
				className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
				name="message"
				id="message"
				rows="10" 
				cols="30"
				onChange={handleOnChange}
				></textarea>

			</div>

			<div>
				<label 
				htmlFor="star" 
				>Rating
				</label>

				<input
				className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full"
				type="number" 
				min="1"
				max="5"
				name="star" 
				onChange={handleOnChange} />

			</div>
						
			<button 
			className="bg-blue-500 text-white p-2 mt-4"
			type="submit"
			>Send Feedback</button>
	 	</form>
	);
}


export default FeedbackForm;

