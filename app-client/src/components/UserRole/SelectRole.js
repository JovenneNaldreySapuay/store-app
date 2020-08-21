import _ from 'lodash';
import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { 
  fetchUsers, 
  updateUserRole 
} from '../../actions';

class SelectRole extends Component {
  state = {
    id: '',
    role: ''
  };

  componentDidMount() {
    this.props.fetchUsers();
  }

  handleOnChange = (e) => {
    this.setState({ 
      ...this.state,
      role: e.target.value,
    });
  }

  handleOnClick = (e) => {
    this.setState({ 
      id: e.target.id,
      role: e.target.value,
    });
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      id: this.state.id,
      role: this.state.role
    };

    this.props.updateUserRole(data);

    alert('ID: ' + data.id + ' ROLE: ' + data.role );
  }

  getUserId = () => {
    const { users } = this.props;
    return _.map(users, ({ _id }) => _id);
  }

  render() {
    const { users } = this.props;
    const usersArray = Array.from(users);

    return (
      <div>
        <h2>Manage Role</h2>
        <Form onSubmit={ this.handleOnSubmit } >
        <Form.Field>
          <label htmlFor="user">Select a user</label>
          <select multiple onChange={ this.handleOnChange } onClick={ this.handleOnClick }>
            {
              usersArray.map((user, index) => {
                return(
                  <option key={ index } id={ user._id } value={ user._id }>{ user.fullName }</option>
                )
              })
            }
          </select>
        </Form.Field>

        <Form.Field>
          <label htmlFor="role">Select a role</label>
          <select onChange={ this.handleOnChange }>
            <option value="">Select Role</option> 
            <option value="user">User</option> 
            <option value="admin">Admin</option> 
          </select>  
        </Form.Field>
        { this.props.role === "demo_admin" ? (<button disabled>SUBMIT</button>) : (<button>SUBMIT</button>) }
        </Form>
      </div>

    ); 
  }
}

function mapStateToProps(state) {
  return { 
    users: state.user,
    id: state.user.id,
    role: state.auth.role
  };
}

export default connect(mapStateToProps, { fetchUsers, updateUserRole })(SelectRole);