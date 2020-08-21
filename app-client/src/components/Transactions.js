import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCheckoutProducts } from '../actions/checkout';

class Transactions extends Component {

	componentDidMount() {
    	this.props.fetchCheckoutProducts();
  	}

	render() {
		const { checkouts } = this.props;

		// console.log("Transactions", this.props);
		
		return (
			<div className="px-4" style={{ width: 600, margin: '0 auto' }}>
				<h1 className="text-center mb-3">Transaction Logs</h1>
				
				{(! checkouts || checkouts.length === 0) &&
					<div>Loading... <i className="fa fa-refresh fa-spin"></i></div>
				}

				{
				checkouts.map((checkout, idx) => {
					return (
						<div className="p-3 mb-5 border mt-5 bg-blue-100" key={idx}>
							<p className="mb-2">
								Customer ID <span className="text-blue-600">{checkout._user}</span> has successfully checked out.
							</p>
							<Link 
							className="bg-blue-600 text-white py-1 px-2"
							to={`/admin/transactions/${checkout._id}`}>
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
					)
				})
				}
			</div>

		); 
	}
}

const mapStateToProps = (state) => {
	return {
		checkouts: state.checkout.items	
	};
}

export default connect(mapStateToProps, { fetchCheckoutProducts })(Transactions);