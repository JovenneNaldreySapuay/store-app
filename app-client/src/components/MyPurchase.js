import React, { Component } from "react";
import { connect } from "react-redux";
import { IonSpinner } from "@ionic/react";
import { Link } from "react-router-dom";

import { fetchCheckoutProductsByUserId } from "../actions/checkout";

class MyPurchase extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    const { loggedUserId } = this.props;

    setTimeout(() => {
      this.props.fetchCheckoutProductsByUserId(loggedUserId);
      this.setState({ isLoading: false });
    }, 2000);
  }

  render() {
    // console.log("MyPurchase", this.props);
    const { checkouts } = this.props;
    return (
      <div className="mx-auto p-3 w-11/12 md:w-6/12 bg-white h-full">
        <div className="flex justify-end mt-3 sm:hidden">
          <Link
            className="block border border-gray-400 px-2 py-1 rounded text-gray-500"
            to="/"
          >
            {" "}
            &larr; Return
          </Link>
        </div>
        <div className="p-5">
          <h1 className="text-center uppercase font-bold text-xl tracking-wide">
            My Purchase
          </h1>
        </div>
		{this.state.isLoading ? (
          <div className="flex justify-center">
            <IonSpinner name="bubbles" />{" "}
            <span className="text-gray-500 ml-1">Loading...</span>
          </div>
		) : !checkouts || checkouts.length === 0 ? (
          <p className="text-center">You have no purchased item.</p>
        ) : (
          checkouts.map((checkout, idx) => {
            return (
              <div className="p-3" key={idx}>
                {checkout.products.map((product, idx) => {
                  return (
                    <div
                      className="bg-gray-100 border p-2"
                      key={idx}
                    >
                      <img
                        className="border border-grey-200"
                        src={product.image}
                        alt={product.title}
                        width={80}
                      />
                      <p><span className="font-semibold">Item Name:</span> {product.title}</p>
                      <p><span className="font-semibold">Quantity:</span> {product.quantity}</p>
                      <p><span className="font-semibold">Unit Price:</span> ${product.price}</p>
                      <p><span className="font-semibold">Subtotal:</span> ${product.total}</p>
                    </div>
                  );
                })}
                <div className="bg-blue-200 p-2">
                  <p><span className="font-semibold">Shipping Fee:</span> ${checkout.shipping_fee}</p>
                  <p><span className="font-semibold">Overall Total:</span> ${checkout.total}</p>
                  <p><span className="font-semibold">Status:</span> Paid</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    checkouts: state.checkout.items,
    loggedUserId: state.auth._id,
  };
};

export default connect(mapStateToProps, { fetchCheckoutProductsByUserId })(
  MyPurchase
);
