import React, { Component } from "react";
import { connect } from "react-redux";
import { IonSpinner } from "@ionic/react";
import { Link } from "react-router-dom";

import { fetchCartItems } from "../actions/cart";

class AbandonedCart extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.fetchCartItems();
      this.setState({ isLoading: false });
    }, 2000);
  }

  render() {
    const { carts } = this.props;
    // console.log("AbandonedCart", this.props);

    return (
      <div
        className={
          carts.length === 0
            ? "p-3 bg-white w-11/12 md:w-6/12 h-screen mx-auto"
            : "p-3 bg-white w-11/12 md:w-6/12 h-full mx-auto"
        }
      >
        <div className="flex justify-end mt-3 sm:hidden">
          <Link
            className="block border border-gray-400 px-2 py-1 rounded text-gray-500"
            to="/admin"
          >
            {" "}
            &larr; Return
          </Link>
        </div>
        <div className="p-5">
          <h1 className="text-center uppercase font-bold text-xl tracking-wide">
            Abandoned Cart
          </h1>
        </div>

        <div className="flex justify-end">
          <p className="text-red-500">{carts && carts.length} item{carts.length > 1 ? 's' : ''}</p>
        </div>

        {this.state.isLoading ? (
          <div className="flex justify-center">
            <IonSpinner name="bubbles" />{" "}
            <span className="text-gray-500 ml-1">Loading...</span>
          </div>
        ) : !carts || carts.length === 0 ? (
          <div className="text-center">No records to show.</div>
        ) : (
          carts.map((cart, idx) => {
            return (
              <div key={idx} className="my-3 bg-gray-100 border p-3 rounded">
                <img
                  className="border border-grey-200"
                  src={cart.image}
                  alt={cart.title}
                  width={100}
                />
                <p>
                  Cart Owner ID:{" "}
                  <span className="underline text-red-400">{cart.userid}</span>
                </p>
                <p>Item Name: {cart.title}</p>
                <p>Price: ${cart.price}</p>
                <p>Quantity: {cart.quantity}</p>
                <p>Total: ${cart.total}</p>
                <button className="hidden mt-2 bg-blue-500 text-white py-1 px-2">
                  Send Reminder
                </button>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    carts: state.cart.abandonedItems || [],
  };
}

export default connect(mapStateToProps, { fetchCartItems })(AbandonedCart);
