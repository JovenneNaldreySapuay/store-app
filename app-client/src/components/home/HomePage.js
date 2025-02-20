import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions/auth';

const HomePage = ({ isAuthenticated, logout }) => {

	return (
		<div className="text-center pt-5 bg-white h-screen">
			<h1 style={{ fontSize: '40px', color: '#444' }}>Welcome to Shopeeh!</h1>
			<Link to="/shop" className="inline-block btn mt-3">Shop Now</Link>
		</div>
	);
};

function mapStateToProps(state) {
		
	return { 
		isAuthenticated: !!state.user.token
	};
}

export default connect(mapStateToProps, { logout: actions.logout })(HomePage);