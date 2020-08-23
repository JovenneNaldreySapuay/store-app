import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import UserTable from './UserTable';
import SideBar from '../SideBar';

import { fetchUsers } from '../../actions/user';

class ManageRole extends Component {

	state = {
		filterText: ''
	}

	handleFilterTextChange = (filterText) => {
		this.setState({
			filterText: filterText
		});
	}

	componentDidMount() {
		this.props.fetchUsers();
	}

	render() {
		const { users, auth } = this.props;

		return (
			<React.Fragment>
				{auth.role !== "admin" && <Redirect to="/dashboard" />}
				
				<div className="bg-gray-200 border-r w-64 h-screen absolute top-0 left-0 overflow-y-scroll">
					<SideBar />
				</div>
				
				<div className="w-full bg-white mt-3 pl-64">
					<div className="p-4 text-sm text-gray-800">
						<h1 className="text-4xl text-gray-700 font-bold leading-none mb-8">All Users</h1> 
					
				
						<UserTable 
							users={users} 
							filterText={this.state.filterText}
						/>
					</div>
				</div>
			</React.Fragment>
			
		); 
	}
}

function mapStateToProps(state) {
	return { 
		users: state.user.items,
		auth: state.auth
	};
}

export default connect(mapStateToProps, { fetchUsers })(ManageRole);