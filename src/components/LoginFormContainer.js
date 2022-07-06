import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';

import LoginForm from './LoginForm';
import {catalogPost} from '../utils/api';

class LoginFormContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const {name, value} = event.target;
		this.setState({[name]: value});
	}

	handleSubmit(event) {
		event.preventDefault();

		const {handleMessageNew, handleRequestClose} = this.props;
		const {email, password} = this.state;

		catalogPost('/auth', {email, password})
			.then((response) => {
				if (response.status === 200) {
					this.props.handleLogIn(response.token);
					handleRequestClose();
				} else {
					handleMessageNew(
						<FormattedMessage
							id="error.incorrect-email-password"
							defaultMessage="The email or password you entered was incorrect."
							description="error message that password is not correct"
						></FormattedMessage>
					);
				}
			})
			.catch((error) => {
				handleMessageNew(
					<FormattedMessage
						id="error.unspecified"
						defaultMessage="Oops! Something went wrong."
						description="generic error message"
					/>
				);
			});
	}

	render() {
		return (
			<LoginForm
				{...this.props}
				{...this.state}
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
			/>
		);
	}
}

LoginFormContainer.propTypes = {
	handleLogIn: PropTypes.func.isRequired,
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestClose: PropTypes.func.isRequired
};

export default LoginFormContainer;
