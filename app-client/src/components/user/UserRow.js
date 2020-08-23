import React from 'react';
import { Link } from 'react-router-dom';

const UserRow = ({ user }) => {
	
	return (
		<tr key={user._id}>
			<td className="p-3 border">{user._id}</td>
			<td className="p-3 border">{user.fullName}</td>
			<td className="p-3 border">{user.email}</td>
			<td className="p-3 border">{user.role}</td>
			<td className="p-3 border">
			<Link to={`/users/${user._id}`} className="underline text-blue-400 hover:text-blue-500">Manage Role</Link>
			</td>
		</tr>
	);
};

export default UserRow;