import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserRow from './UserRow';

import { fetchUsers } from '../../actions/user';

class UserTable extends Component {

	componentDidMount() {
		this.props.fetchUsers();
	}

	render() {

		const rows = [];
		const { users, filterText } = this.props;
    	const usersArray = Array.from(users);

		usersArray.map((user, index) => {
			if (user.fullName.toLowerCase().indexOf(filterText.toLowerCase()) === -1) return null;
			
			return (
				rows.push(<UserRow key={index} user={user} />)
			);
		})

		return (
			<div>
				<table className="border w-full text-left shadow-sm">
				<thead>
				<tr>
					<th className="p-3 text-xs text-gray-900 uppercase font-bold tracking-wide">User ID</th>
					<th className="p-3 text-xs text-gray-900 uppercase font-bold tracking-wide">Fullname</th>
					<th className="p-3 text-xs text-gray-900 uppercase font-bold tracking-wide">Email</th>
					<th className="p-3 text-xs text-gray-900 uppercase font-bold tracking-wide">User Role</th>
					<th className="p-3 text-xs text-gray-900 uppercase font-bold tracking-wide"></th>
				</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
				</table>
			</div>
		); 
	}
}

function mapStateToProps(state) {
	return { 
		users: state.user.items
	};
}

export default connect(mapStateToProps, { fetchUsers })(UserTable);