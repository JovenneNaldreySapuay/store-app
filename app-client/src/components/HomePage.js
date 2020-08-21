import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/auth';

const HomePage = ({ isAuthenticated, logout }) => {

	return (
		<div style={{ textAlign: 'center', paddingTop: '40px', marginBottom: '200px' }}>
			<h1 style={{ fontSize: '40px', color: '#444' }}>Welcome to Shopper's Ave.</h1>
			<Link to="/shop" className="inline-block bg-orange-400 text-white px-3 py-2 mt-3">Shop Now</Link>
		</div>
	);
};

function mapStateToProps(state) {
		
	return { 
		isAuthenticated: !!state.user.token
	};
}

export default connect(mapStateToProps, { logout: actions.logout })(HomePage);