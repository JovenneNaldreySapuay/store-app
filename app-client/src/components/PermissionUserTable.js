import React from 'react';

const PermissionUserTable = ({ user, deleteBtn }) => {

  // console.log("PermissionUserTable", user );
  return (
   
        <tr key={user._id}>
          <td style={{ textAlign: 'center'}}>{user._id}</td>
          <td style={{ textAlign: 'center'}}>{user.email}</td>
          <td style={{ textAlign: 'center'}}>
            <select>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </td>
        </tr>

    
  );
}

export default PermissionUserTable;

