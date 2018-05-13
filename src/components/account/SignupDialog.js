import React from 'react';
import PropTypes from 'prop-types';

import {DialogTitle} from '../dialog';
import SignupFormContainer from './SignupFormContainer';

const SignupDialog = ({
  handleLogIn,
  handleMessageNew,
  handleRequestClose,
  handleRequestOpen,
  history,
  session,
}) => (
  <div>
    <DialogTitle>Sign Up</DialogTitle>
    <SignupFormContainer
      handleLogIn={handleLogIn}
      handleMessageNew={handleMessageNew}
      handleRequestClose={handleRequestClose}
      handleRequestOpen={handleRequestOpen}
      history={history}
      session={session}
    />
  </div>
);

SignupDialog.defaultProps = {
  session: null,
};

SignupDialog.propTypes = {
  handleLogIn: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  session: PropTypes.string,
};

export default SignupDialog;
