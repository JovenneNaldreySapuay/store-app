import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchNotificationByUser } from '../actions/notification';

class Notifications extends Component {

	componentDidMount() {
		const { loggedUserId } = this.props;

		if (loggedUserId) {
			this.props.fetchNotificationByUser(loggedUserId);
		}
	}

	// Header: Have you rated your purchase?
	// SubText: Order 2345223 is completed. Your feedback matters to others! 
	// Link: Rate Products Now
	
	render() {
		console.log("Notifications", this.props);

		const { notification } = this.props;
		return (
			<div className="mx-auto p-3 w-8/12 bg-white h-screen">
				<h1 className="text-center mb-3">Notifications</h1>	
				<ul>
				{ (! notification || notification === null) ? 
				    <p className="text-center">You have no notifications.</p> : 
				  (! notification.productIds || notification.productIds.length === 0) ? (
					<div>Loading... <i className="fa fa-refresh fa-spin"></i></div>
				) : (
					
					notification.productIds.map(id => {
						return (
							<div key={id}>
							<li>You have ordered item in our store. Please kindly{' '}  
							<Link 
							className="underline text-blue-500"
							to={`/product/${id}/feedback`}>send your feedback.</Link></li>
							</div>
						)
					})
					
				)
				}
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
}

export default connect(mapStateToProps, { fetchNotificationByUser })(Notifications);