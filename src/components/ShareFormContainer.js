import React from 'react';
import PropTypes from 'prop-types';

import {shareResource} from '../utils/api';
import ShareForm from './ShareForm';

class ShareFormContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			shareUrl: window.location.href
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const {name, value} = event.target;
		this.setState({[name]: value});
	}

	handleSubmit = async (event) => {
		const {
			handleMessageNew,
			handleRequestClose,
			handleRequestOpen,
			handleLogOut,
			listId, // either list id or org id
			session,
			shareType,
			user
		} = this.props;
		event.preventDefault();
		if (
			!user ||
			!this.state.email ||
			!this.state.shareUrl ||
			!listId ||
			!shareType
		) {
			handleMessageNew('Invalid request');
			return;
		}
		try {
			let payload = {
				email: this.state.email,
				shareType: shareType,
				shareUrl: this.state.shareUrl,
				resource: listId,
				jwt: session,
				userId: user
			};
			await shareResource(payload);
			handleMessageNew(
				`${shareType === 'collection' ? 'List' : 'Resource'} shared sucessfully`
			);
			handleRequestClose();
		} catch (error) {
			if (error.response && error.response.status === 401) {
				handleMessageNew('Your session has expired. Please log in again.');
				handleLogOut();
				handleRequestClose();
			} else if (error.response && error.response.status === 403) {
				handleRequestOpen('password');
			} else {
				handleMessageNew('Oops! Something went wrong.');
				handleRequestClose();
			}
		}
	};

	render() {
		return (
			<ShareForm
				{...this.props}
				{...this.state}
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
			/>
		);
	}
}

ShareFormContainer.propTypes = {
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestClose: PropTypes.func.isRequired,
	listId: PropTypes.string.isRequired,
	session: PropTypes.string.isRequired,
	shareType: PropTypes.string.isRequired
};

export default ShareFormContainer;
