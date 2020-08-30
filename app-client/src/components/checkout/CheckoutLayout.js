import React from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const CheckoutLayout = ({ children }) => {		
	return (
		<div>
			<Elements stripe={stripePromise}>
				{children}
			</Elements>
		</div>
	);
};

export default CheckoutLayout;
