import React from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// import ConfirmEmailMessage from './ConfirmEmailMessage';
import LeftMenus from './LeftMenus';

const UserDashboard = () => {
	return (
		<Grid>
			<Grid.Row>
				<Grid.Column width={2}>
					<LeftMenus />
				</Grid.Column>
				<Grid.Column width={5}>
					<h2>Quick Glance</h2>
					<p><Link to="/dashboard">3</Link> posts</p>
					<p><Link to="/dashboard">5</Link> users</p>
					<p><Link to="/dashboard">15</Link> comments</p>
					<p><Link to="/dashboard">13</Link> images</p>
				</Grid.Column>
				<Grid.Column width={5}>
					<h2>Activity</h2>
					<p>Recently Published</p>
					<ul>
						<li>https://reactpatterns.com/ [edit]</li>
						<li>https://reactpatterns.com/ [edit]</li>
						<li>https://reactpatterns.com/ [edit]</li>
						<li>https://reactpatterns.com/ [edit]</li>
						<li>https://reactpatterns.com/ [edit]</li>
					</ul>
				</Grid.Column>

				<Grid.Column width={3}>
					<h2>Hire the Developer</h2>
					<div>
						<p>Information here...</p>
					</div>
				</Grid.Column>
			</Grid.Row>
		</Grid> 	
	)
};

// function mapStateToProps(state) {
	
// 	return { 
// 		isConfirmed: !!state.auth.confirmed
// 	}
// }

// export default connect(mapStateToProps)(UserDashboard);

export default UserDashboard;
