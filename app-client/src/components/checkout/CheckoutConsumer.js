import React from 'react';
import {ElementsConsumer} from '@stripe/react-stripe-js';
import CheckoutPage from './CheckoutPage';
import CheckoutLayout from './CheckoutLayout';

const CheckoutConsumer = () => (
  <CheckoutLayout>	
	  <ElementsConsumer>
	    {({stripe, elements}) => (
	      <CheckoutPage 
	      	stripe={stripe} 
	      	elements={elements} 
	      />
	    )}
	  </ElementsConsumer>
  </CheckoutLayout>
);

export default CheckoutConsumer;