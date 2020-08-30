import React from 'react';
import {CardElement} from '@stripe/react-stripe-js';

const options = {
  style: {
    base: {
      'color': '#424770',
      'letterSpacing': "0.025em",
      'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
      'fontSmoothing': 'antialiased',
      'fontSize': '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const CardInput = () => {

  return (
    <CardElement 
      options={options} 
    />
  );

}

export default CardInput;