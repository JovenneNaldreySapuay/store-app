import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUsers } from '../actions/user';

import SideBar from './SideBar';
import ConfirmEmailMessage from './ConfirmEmailMessage';

class Dashboard extends Component {

	componentDidMount() {
		this.props.fetchUsers();
	}

	render() {
		const { 
			users
		} = this.props;

		return (
			<React.Fragment>
				<div className="hidden sm:block bg-gray-200 border-r w-64 h-screen absolute top-0 left-0 overflow-y-scroll">
					<SideBar />
				</div>
								
				<div className="w-full bg-white mt-3 sm:pl-64">
					<div className="p-4 text-sm text-gray-800">
						<h1 className="text-4xl text-gray-700 font-bold leading-none mb-8">Dashboard</h1> 

						<div>
							{ ! this.props.isConfirmed && <ConfirmEmailMessage /> }

							<div className="border border-gray-400 w-full sm:w-64 rounded p-6 mb-2">
								<h3 className="font-bold text-gray-600 pb-1">Quick Glance</h3>
								
								<p><Link to="/users" className="text-blue-400 font-bold">{users.length}</Link> {(users.length > 1) ? 'users' : 'user'}</p>
						
							</div>

							<div className="border border-gray-400 w-full sm:w-64 rounded p-6">
								<h3 className="font-bold text-gray-600 pb-1">Activity</h3>
								<p className="text-gray-500">Recently Published</p>
								<ul>
								<li>Post 1 [edit]</li>
								<li>Post 1 [edit]</li>
								<li>Post 1 [edit]</li>
								</ul>
							</div>
						</div>
					</div>
				</div>				
			</React.Fragment>
		)
	}
}

function mapStateToProps(state) {
	return { 
		isConfirmed: !!state.auth.confirmed,
		users: state.user.items
	}
}

export default connect(mapStateToProps, { fetchUsers })(Dashboard);
