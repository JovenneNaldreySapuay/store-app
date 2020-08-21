import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCheckoutProductsById } from '../actions/checkout';
import { addNotification } from '../actions/notification';

class TransactionView extends Component {

	componentDidMount() {
		const { transactionId } = this.props;

		if (transactionId) {
    		this.props.fetchCheckoutProductsById(transactionId);
    	}
  	}

  	handleOnReviewSubmit = (e) => {
  		e.preventDefault();

  		const { transactionItem } = this.props;

  		const userid = transactionItem._user;
  		const ids = this.getProductIds();

  		const notification = {
  			productIds: ids,
  			_userid: userid
  		}

  		this.props.addNotification(notification);

  		console.log("Notification Data", notification);
  	}

  	getProductIds() {
  		const { transactionItem } = this.props;

  		let ids = [];

  		if (! transactionItem.products || transactionItem.products.length === 0) return null;

  		transactionItem.products.map(item => ids.push(item._product));

  		return ids;
  	}

	render() {		
  		const { transactionItem } = this.props;

		return (
			<div style={{ width: 600, margin: '0 auto', padding: 15 }}>
				<h1 className="text-center mb-3">Transaction View</h1>
				{ 
				(! transactionItem.products || 
					transactionItem.products.length === 0) ? 
					<div>Loading...</div> : ( 
					<div>
					{transactionItem.products.map((item, idx) => {
						return (
							<div key={idx} className="bg-gray-100 p-2 border border-grey-100 mb-1">
								<img 
								className="border border-grey-100"
								src={item.image} alt={item.title} width={80} />
								<p>Item ID: {item._product}</p>
								<p>Item Name: {item.title}</p>
								<p>Item Price: ${item.price}</p>
								<p>Quantity: {item.quantity}</p>
							</div>
						)
					})}

					<button 
					className="bg-red-500 text-white py-1 px-1 mt-2"
					onClick={this.handleOnReviewSubmit}>Send Review Notification
					</button>
					</div>
				) 
				}
			</div>

		); 
	}
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params._id;

	return {
		transactionId: id,
		transactionItem: state.checkout.item,
	};
}

export default connect(mapStateToProps, { addNotification, fetchCheckoutProductsById })(TransactionView);