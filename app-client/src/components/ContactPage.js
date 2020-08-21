import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { sendmail } from '../actions/';
import ContactForm from './ContactForm';

class ContactPage extends Component {
	// submit = data => this.props.sendmail(data); //.then(() => this.props.history.push("/thanks"))

	render() {
		return (
			<div>
				<h1>Contact Form</h1>

				<ContactForm submit={this.submit} />
			</div>

		); 
	}
}

export default ContactPage;

