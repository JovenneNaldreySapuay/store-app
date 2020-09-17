import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUser } from "../actions/user";
import formatDate from "../utils/formatDate";

class AccountPage extends Component {
  componentDidMount() {
    const { _id } = this.props.auth;
    if (_id) {
      this.props.fetchUser(_id);
    }
  }

  render() {
    const { _id, fullName, email, updatedAt } = this.props.user;

    // console.log(this.props);

    let token;
    if (localStorage.bookwormJWT) {
      token = localStorage.bookwormJWT;
    }

    return (
      <React.Fragment>
        <div className="bg-white h-screen md:w-6/12 mx-auto w-11/12">
          <div className="p-4 text-sm text-gray-800">
            <div className="p-5">
              <h1 className="text-center uppercase font-bold text-xl tracking-wide">
                Profile
              </h1>
            </div>
            <table id="profile" className="border w-full text-left shadow-sm">
              <thead>
                <tr>
                  <th className="p-3 text-xs text-gray-900 uppercase font-bold tracking-wide">
                    Full Name
                  </th>
                  <th className="p-3 text-xs text-gray-900 uppercase font-bold tracking-wide">
                    Email
                  </th>
                  <th className="p-3 text-xs text-gray-900 uppercase font-bold tracking-wide">
                    <span className="text-gray-500">Last updated:</span>{" "}
                    <span className="text-gray-600">
                      {updatedAt && formatDate(updatedAt)}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border">{fullName}</td>
                  <td className="p-3 border">{email}</td>
                  <td className="p-3 border">
                    <Link
                      to={`/account/${_id}`}
                      className="underline text-blue-400 hover:text-blue-500 block sm:block"
                    >
                      Edit Profile
                    </Link>
                    <Link
                      to={`/reset_password/${token}`}
                      className="hidden underline text-blue-400 hover:text-blue-500"
                    >
                      Reset Password
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user.item,
});

export default connect(mapStateToProps, { fetchUser })(AccountPage);
