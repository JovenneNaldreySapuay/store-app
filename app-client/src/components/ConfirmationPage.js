import React, { Component } from 'react';
import { Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirm } from '../actions/auth';

class ConfirmationPage extends Component {
	state = {
		loading: true,
		success: false
	};

	componentDidMount() {
		// console.log( this.props );
		this.props.confirm(this.props.match.params.token)
		.then(() => this.setState({ loading: false, success: true }))
		.catch(() => this.setState({ loading: false, success: false }));
	}

	render() {
		
		const { loading, success } = this.state;

		return (
			<div>
				{loading && ( <Message icon>
					<Icon name="circle notched" loading />
					<Message.Header>
						Validating your email
					</Message.Header>
				</Message>
				)}

				{
					!loading && success && ( <Message success icon>
						<Icon name="checkmark" />
						<Message.Content>
							<Message.Header>
								Thank you. Your account has been verified. &nbsp;
								<Link to="/dashboard">Go to your dashboard</Link>
							</Message.Header>
						</Message.Content>
						</Message>
					)
				}
                
                {/* loading was false but coerced to true*/}
                {/* success was false but coerced to true*/}
				{!loading && !success && ( <Message negative icon>
					<Icon name="warning sign" />
					<Message.Content>
						<Message.Header>
							Opps. Invalid token it seems.
						</Message.Header>
					</Message.Content>
					</Message>
				)}
			</div>

		); 
	}
}

export default connect(null, { confirm })(ConfirmationPage);