import React from "react";
import { connect } from "react-redux";

import { deleteProductCart } from "../actions/cart";

const CartIconRow = (props) => {
  return (
    <tr>
      <td>
        {props.product.title}
        <p><span className="font-semibold block">
          ${props.product.price}
        </span> &times; {props.product.quantity}</p>
      </td>
      <td>
        <button
          onClick={() => props.deleteProductCart(props.product._id)}
          className="text-red-400 hover:text-red-500 underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default connect(null, { deleteProductCart })(CartIconRow);
