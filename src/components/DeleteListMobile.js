import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from 'react-intl';

import {withStyles} from '@material-ui/core/styles';

import AsylumConnectButton from './AsylumConnectButton';
import AsylumConnectBackButton from './AsylumConnectBackButton';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';

import DialogTitle from './DialogTitle';
import {deleteList} from '../utils/api';

const styles = (theme) => ({
	spacingTop: {marginTop: '1rem'},
	backButton: {
		paddingBottom: '0.83em'
	},
	root: {
		flexGrow: 1,
		marginLeft: '2.5em',
		marginRight: '2.5em',
		borderBottom: '1px solid ' + theme.palette.common.faintBlack,
		boxShadow: 'none'
	}
});

function DeleteListMobile(props) {
	const confirmDelete = () => {
		const {handleMessageNew} = props;

		deleteList(props.dialog.split('/')[1], props.user)
			.then(() => {
				handleMessageNew(
					<FormattedMessage id="favorites.delete.list.dialog.success.message" />
				);
				props.handleFetchUser(props.session);
				props.handleRequestClose();
				props.history.push('/' + props.locale + '/favorites');
			})
			.catch(() => {
				handleMessageNew(<FormattedMessage id="error.unspecified" />);
			});
	};

	const {classes, handleRequestClose} = props;
	let isShared = true;

	if (props.listVisibility !== 'shared') {
		isShared = false;
	}

	return (
		<div>
			<Paper className={classes.root}>
				<Toolbar
					classes={{
						root: classes.toolbarRoot,
						gutters: classes.toolbarGutters
					}}
				>
					<AsylumConnectBackButton
						onClick={() => {
							handleRequestClose();
						}}
					/>
				</Toolbar>
				<DialogTitle data-test-id="delete-list-title">
					<FormattedMessage id="favorites.delete.list.dialog.title" />
					{props.listTitle}?
				</DialogTitle>
				{isShared ? (
					<Typography type="body1" data-test-id="delete-list-shared">
						<FormattedMessage id="favorites.delete.list.dialog.shared.message" />
					</Typography>
				) : null}
				<AsylumConnectButton
					variant="primary"
					onClick={confirmDelete}
					className={classes.spacingTop}
					testIdName="delete-list-delete-button"
					children={<FormattedMessage id="action.delete" />}
				></AsylumConnectButton>

				<AsylumConnectButton
					variant="secondary"
					className={classes.spacingTop}
					testIdName="delete-list-cancel-button"
					onClick={handleRequestClose}
					children={<FormattedMessage id="action.cancel" />}
				></AsylumConnectButton>
			</Paper>
		</div>
	);
}

DeleteListMobile.propTypes = {
	handleRequestClose: PropTypes.func.isRequired
};

export default withStyles(styles)(DeleteListMobile);
