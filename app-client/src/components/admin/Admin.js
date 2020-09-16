import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

class Admin extends Component {
  render() {
    return (
      <div className="bg-white w-11/12 h-screen mx-auto p-3">
        {(this.props.user.role === "user" || this.props.user.role === "user_demo") && <Redirect to="/" />}
        <h1 className="text-center mb-3">Admin Section</h1>
        <ul>
          <li className="mb-2">
            <Link className="hover:underline text-red-500" to="/admin/products">
              Product Manager
            </Link>
          </li>
          <li className="mb-2">
            <Link
              className="hover:underline text-red-500"
              to="/admin/transactions"
            >
              Transaction Logs
            </Link>
          </li>
          <li className="mb-2">
            <Link
              className="hover:underline text-red-500"
              to="/admin/abandoned-cart"
            >
              Abandoned Cart
            </Link>
          </li>
          <li className="mb-2">
            <Link className="hover:underline text-red-500" to="/admin/sales">
              Sales
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.auth.token,
    user: state.auth,
  };
};

export default connect(mapStateToProps, {})(Admin);
