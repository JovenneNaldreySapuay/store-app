import React, { Component } from "react";

class DemoLoginForm extends Component {
  state = {
    user: {
      email: process.env.REACT_APP_USER_EMAIL,
      password: process.env.REACT_APP_USER_PASSWORD,
    },
    admin: {
      email: process.env.REACT_APP_ADMIN_EMAIL,
      password: process.env.REACT_APP_ADMIN_PASSWORD,
    },
  };

  handleOnSubmitUser = (e) => {
    e.preventDefault();
    this.props.submit(this.state.user).catch((err) => console.log(err));
  };

  handleOnSubmitAdmin = (e) => {
    e.preventDefault();
    this.props.submit(this.state.admin).catch((err) => console.log(err));
  };

  render() {
    // TODO: put icon like admin or user image inside the button
    return (
      <div className="text-center">
        <p className="text-center mt-3 mb-1">Login as a demo:</p>
        <form onSubmit={this.handleOnSubmitUser} className="inline-block">
          <button className="btn-demo mr-2">Demo User</button>
        </form>
        <form onSubmit={this.handleOnSubmitAdmin} className="inline-block">
          <button className="btn-demo">Demo Admin</button>
        </form>
      </div>
    );
  }
}

export default DemoLoginForm;
