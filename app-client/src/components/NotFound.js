import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
		
	return (
		<div className="bg-white w-8/12 h-screen mx-auto">
			<h1 className="text-center mb-4">404 Page Not Found</h1>
			<Link 
			className="font-semibold text-center hover:underline text-gray-700" 
			to="/"
			>&larr; Go back to home page
			</Link>
		</div>
	);
};

export default NotFound;