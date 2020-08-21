import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUser } from '../actions/user';

class AccountPage extends Component {

	componentDidMount() {
		const { _id } = this.props.auth;
		if (_id) {
			this.props.fetchUser(_id);
		}
	}

	render() {
	
		const { _id, fullName, email } = this.props.user;		
		
		let token;
		if (localStorage.bookwormJWT) {
			token = localStorage.bookwormJWT;
		}
		
		return (
			<React.Fragment>
				<div className="w-full bg-white mt-3 sm:pl-64">
					<div className="p-4 text-sm text-gray-800">
						<h1 className="text-4xl text-gray-700 font-bold leading-none mb-8">Profile</h1> 
						<table id='profile' className="border w-full sm:w-3/4 text-left shadow-sm">
						<thead>
						<tr>
							<th className="p-3 text-xs text-gray-900 uppercase font-bold tracking-wide">Full Name</th>
							<th className="p-3 text-xs text-gray-900 uppercase font-bold tracking-wide">Email</th>
							<th className="p-3 text-xs text-gray-900 uppercase font-bold tracking-wide"><span className="text-gray-500">Last updated at:</span> <span className="text-gray-600">Apr 22, 2020 @ 8:50 AM</span></th>
						</tr>
						</thead>
						<tbody>
							<tr>
							<td className="p-3 border">{fullName}</td>
							<td className="p-3 border">{email}</td>
							<td className="p-3 border">
								<Link to={`/account/${_id}`} className="underline text-blue-400 hover:text-blue-500 block sm:block">Edit Account</Link>
								<Link to={`/reset_password/${token}`} className="underline text-blue-400 hover:text-blue-500 block sm:inline-block">Reset Password</Link>
							</td>
							</tr>
						</tbody>
						</table>
					</div>
				</div>
			</React.Fragment>
		); 
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	user: state.user.item
});

export default connect(mapStateToProps, { fetchUser })(AccountPage);