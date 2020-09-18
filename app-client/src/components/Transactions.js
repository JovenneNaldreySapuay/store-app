import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { IonSpinner } from "@ionic/react";

import { fetchCheckoutProducts } from "../actions/checkout";

class Transactions extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.fetchCheckoutProducts();
      this.setState({ isLoading: false });
    }, 2000);
  }

  render() {
    const { checkouts, auth } = this.props;

    // console.log("Transactions", this.props);

    return (
      <div className="p-3 bg-white w-11/12 md:w-6/12 h-full mx-auto">
        {(auth.role === "user" || auth.role === "user_demo") && (
          <Redirect to="/" />
        )}

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
            Transaction Logs
          </h1>
        </div>

        {this.state.isLoading ? (
          <div className="flex justify-center">
            <IonSpinner name="bubbles" />{" "}
            <span className="text-gray-500 ml-1">Loading...</span>
          </div>
        ) : checkouts.length === 0 ? (
          <div className="text-center">No records to show.</div>
        ) : (
          checkouts.map((checkout, idx) => {
            return (
              <div className="p-3 mb-5 border rounded-sm mt-5 bg-gray-100" key={idx}>
                <p className="mb-2">
                  Customer ID{" "}
                  <span className="text-blue-600">{checkout._user}</span> has
                  successfully checked out.
                </p>
                <Link
                  className="bg-gray-600 text-white py-1 px-2"
                  to={`/admin/transactions/${checkout._id}`}
                >
                  View Transaction
                </Link>

                {/* 
							checkout.products.map((item, idx) => {
								return (
									<div key={idx}>
										<p>ID: {item._product}</p>
										<p>Item Name: {item.title}</p>
										<p>Unit Price: {item.price}</p>
										<p>Qty: {item.quantity}</p>
									</div>
								)
							}) 
							*/}
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
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { fetchCheckoutProducts })(
  Transactions
);
