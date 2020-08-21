import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

class Admin extends Component {
	state = {

	};

	render() {
		return (
			<div style={{ width: 600, margin: '0 auto' }}>
				{this.props.user.role !== "admin" && <Redirect to="/shop" />}
				<h1 className="text-center mb-3">Admin Section</h1>
				<ul>
					<li className="mb-2"><Link className="hover:underline text-red-500" to="/admin/products">Product Manager</Link></li>
					<li className="mb-2"><Link className="hover:underline text-red-500" to="/admin/transactions">Transaction Logs</Link></li>
					<li className="mb-2"><Link className="hover:underline text-red-500" to="/admin/abandoned-cart">Abandoned Cart</Link></li>
					<li className="mb-2"><Link className="hover:underline text-red-500" to="/admin/sales">Sales</Link></li>
				</ul>
			</div>

		); 
	}
}

const mapStateToProps = (state) => {
  return { 
    isAuthenticated: !!state.auth.token,
    user: state.auth
  };
}

export default connect(mapStateToProps, {})(Admin);