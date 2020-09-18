import React, { Component } from "react";
import { connect } from "react-redux";
import jsonp from "jsonp";

import { saveVisitor } from "../../actions/visitor";

class DemoLoginForm extends Component {
  state = {
    details: {
      ip: "",
      country: "",
    },
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
    const userDemo = {
      email: this.state.user.email,
      ip: this.state.details.ip,
      country: this.state.details.country
    }
  
    this.props.saveVisitor(userDemo);
    this.props.submit(this.state.user).catch((err) => console.log(err));
  };

  handleOnSubmitAdmin = (e) => {
    e.preventDefault();
    const adminDemo = {
      email: this.state.admin.email,
      ip: this.state.details.ip,
      country: this.state.details.country
    }

    this.props.saveVisitor(adminDemo);
    this.props.submit(this.state.admin).catch((err) => console.log(err));
  };

  async componentDidMount() {
    await jsonp("http://geoip-db.com/jsonp", { name: "callback" }, (err, data) => {
      if (err) {
        console.log(err.message);
      } else {
        this.setState({
          details: {
            ip: data.IPv4,
            country: data.country_name
          }
        }) 
      }
    });
  }

  render() {
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

export default connect(null, { saveVisitor })(DemoLoginForm);

