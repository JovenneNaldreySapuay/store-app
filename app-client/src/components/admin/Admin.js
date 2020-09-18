import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

class Admin extends Component {
  render() {
    return (
      <div className="bg-white w-11/12 md:w-4/12 h-screen mx-auto p-3">
        {(this.props.user.role === "user" ||
          this.props.user.role === "user_demo") && <Redirect to="/" />}
        <div className="p-5">
          <h1 className="text-center uppercase font-bold text-xl tracking-wide">
            Admin Section
          </h1>
        </div>
        <ul>
          <Link className="hover:underline" to="/admin/products">
            <li className="mb-2 bg-gray-100 rounded border p-2">
              Product Manager
            </li>
          </Link>
          <Link className="hover:underline" to="/admin/transactions">
            <li className="mb-2 bg-gray-100 rounded border p-2">
              Transaction Logs
            </li>
          </Link>
          <Link className="hover:underline" to="/admin/abandoned-cart">
            <li className="mb-2 bg-gray-100 rounded border p-2">
              Abandoned Cart
            </li>
          </Link>
          {/*<li className="mb-2">
            <Link className="hover:underline" to="/admin/sales">
              Sales
            </Link>
          </li>*/}
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
