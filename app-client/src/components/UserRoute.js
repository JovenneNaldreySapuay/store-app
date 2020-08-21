import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
		
const UserRoute = ({ isAuthenticated, role, component: Component, ...rest }) => {
	return (
		<Route { ...rest } render={ props => 
			(isAuthenticated && role === 'user') ? <Component { ...props } /> : <Redirect to="/dashboard"/> } />
	);	
};

function mapStateToProps(state) {
	console.log("UserRoute", state.role );
	return {
		isAuthenticated: !!state.auth.token,
		role: state.auth.role
	}
}

export default connect(mapStateToProps)(UserRoute);


