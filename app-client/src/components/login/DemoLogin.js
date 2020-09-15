import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import DemoLoginForm from "./DemoLoginForm";
import { login } from "../../actions/auth";

class DemoLogin extends Component {
  submit = (data) =>
    this.props.login(data).then(() => this.props.history.push("/"));

  render() {
    // console.log("DemoLogin", this.props );
    return (
      <div className="container bg-white mx-auto w-11/12 h-screen">
        <h2 className="text-center my-5">Log-in as a demo user</h2>
        <DemoLoginForm submit={this.submit} />
      </div>
    );
  }
}

DemoLogin.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(DemoLogin);
