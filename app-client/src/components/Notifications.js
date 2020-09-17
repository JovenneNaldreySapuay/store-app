import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IonSpinner } from "@ionic/react";

import { fetchNotificationByUser } from "../actions/notification";

class Notifications extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    const { loggedUserId } = this.props;

    setTimeout(() => {
      this.props.fetchNotificationByUser(loggedUserId);
      this.setState({ isLoading: false });
    }, 2000);
  }

  // Header: Have you rated your purchase?
  // SubText: Order 2345223 is completed. Your feedback matters to others!
  // Link: Rate Products Now

  render() {
    // console.log("Notifications", this.props);

    const { notification } = this.props;
    return (
      <div className="mx-auto p-3 w-11/12 md:w-6/12 bg-white h-screen">
        <div className="p-5">
          <h1 className="text-center uppercase font-bold text-xl tracking-wide">
            Notifications
          </h1>
        </div>
        <ul>
          {this.state.isLoading ? (
            <div className="flex justify-center">
              <IonSpinner name="bubbles" />{" "}
              <span className="text-gray-500 ml-1">Loading...</span>
            </div>
          ) : !notification || notification === null ? (
            <p className="text-center">You have no notifications.</p>
          ) : !notification.productIds ||
            notification.productIds.length === 0 ? (
            <p className="text-center">You have no notifications.</p>
          ) : (
            notification.productIds.map((id) => {
              return (
                <div key={id}>
                  <li>
                    You have ordered item in our store. Please kindly{" "}
                    <Link
                      className="underline text-blue-500"
                      to={`/product/${id}/feedback`}
                    >
                      send your feedback.
                    </Link>
                  </li>
                </div>
              );
            })
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification.item,
    loggedUserId: state.auth._id,
  };
};

export default connect(mapStateToProps, { fetchNotificationByUser })(
  Notifications
);
