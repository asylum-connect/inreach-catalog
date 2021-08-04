import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Fa from 'react-fontawesome';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Loading from './Loading';
import AsylumConnectButton from './AsylumConnectButton';
import AsylumConnectBackButton from './AsylumConnectBackButton';

import {bodyLink} from '../theme';

import ResourceListItem from './ResourceListItem';

const styles = (theme) => ({
	bodyLink: bodyLink(theme),
	container: {
		marginTop: '1rem',
		width: '100%',
		paddingLeft: '20px',
		paddingRight: '20px'
	},
	textCenter: {textAlign: 'center'},
	spacingBottom: {marginBottom: '1rem'},
	spacingLeft: {marginLeft: '1rem'},
	spacingTop: {marginTop: '1rem'},
	backButton: {
		paddingBottom: '0.83em'
	},
	favoritesList: {
		listStyle: 'none',
		display: 'flex',
		flexDirection: 'column',
		padding: 0
	},
	favoriteItem: {
		display: 'flex',
		padding: theme.spacing(1, 0)
	},
	listItem: {
		textTransform: 'capitalize',
		'&:hover': {
			color: theme.palette.common.blue
		}
	},
	listName: {
		textTransform: 'capitalize'
	}
});

const FavoritesListMobile = ({
	anchorEl,
	classes,
	dialog,
	handleFavoriteUpdate,
	handleListSelect,
	handleMenuOpen,
	handleMenuClose,
	handleMessageNew,
	handleRemoveFavorite,
	handleRequestOpen,
	history,
	loadingResources,
	list,
	lists,
	locale,
	match,
	open,
	publicList,
	resources,
	session,
	user,
	userData,
	hasAccess,
	isOwner
}) => {
	if (!session) {
		return (
			<Grid container className={classes.container} direction="column">
				<Typography
					className={classNames(classes.spacingBottom, classes.textCenter)}
					variant="body1"
					data-test-id="favorites-page-header-text"
				>
					Once logged in, you’ll be able to quickly find the organizations and
					resources you have favorited.
					<br />
					<br />
					<AsylumConnectButton
						variant="primary"
						className={classes.spacingTop}
						onClick={(ev) => {
							handleRequestOpen('login');
						}}
						testIdName="favorites-page-login-button"
					>
						Log In
					</AsylumConnectButton>
					<AsylumConnectButton
						variant="secondary"
						className={classes.spacingTop}
						onClick={(ev) => {
							handleRequestOpen('signup');
						}}
						testIdName="favorites-page-signup-button"
					>
						Sign Up
					</AsylumConnectButton>
				</Typography>
			</Grid>
		);
	}
	if (list && !hasAccess && !publicList) {
		return (
			<Grid
				container
				className={null}
				direction="column"
				alignItems="center"
				spacing={1}
			>
				<Grid item xs={12} md={6}>
					<Typography
						className={classes.marginTop}
						variant="body1"
						align="center"
					>
						Sorry! It seems you don't have access to this list!
					</Typography>
				</Grid>
			</Grid>
		);
	}
	return (
		<Grid container className={classes.container} direction="column">
			<Grid item xs={12} className={classes.backButton}>
				<AsylumConnectBackButton
					color="default"
					onClick={
						dialog === 'none'
							? () => history.push('/')
							: () => handleRequestOpen('none')
					}
				/>
			</Grid>

			<Typography
				className={classes.textCenter}
				variant="h3"
				data-test-id="favorites-page-title-text"
			>
				{publicList ? publicList : 'Favorites'}
			</Typography>
			{!publicList && isOwner && (
				<Typography
					className={classes.marginTop}
					variant="body1"
					align="center"
					data-test-id="favorites-page-header-text"
				>
					Your favorites lists are only visible to you and anyone you choose to
					share your lists with.
				</Typography>
			)}
			{!publicList && !isOwner && (
				<Typography
					className={classes.marginTop}
					variant="body1"
					align="center"
					data-test-id="favorites-page-header-text"
				>
					This list was shared with you.
				</Typography>
			)}
			<Grid item xs={12}>
				{!list && (
					<Typography
						className={classes.spacingTop}
						variant="body1"
						align="center"
						data-test-id="favorites-page-create-new-list-button"
					>
						Select one of your favorites lists or{` `}
						<span
							className={classes.bodyLink}
							onClick={() => handleRequestOpen('listNew/favoritesList')}
						>
							create a new list.
						</span>
					</Typography>
				)}
				{list && isOwner && (
					<AsylumConnectButton
						variant="primary"
						className={classes.spacingTop}
						onClick={() =>
							session
								? handleRequestOpen(
										'share/collection/' + list._id + '/' + list.name
								  )
								: handleMessageNew('You must be logged in to share resources')
						}
						testIdName="favorites-page-share-button"
					>
						Share
					</AsylumConnectButton>
				)}
			</Grid>

			{!list && (
				<Grid item xs={12}>
					{lists.length > 0 ? (
						<ul
							className={classes.favoritesList}
							data-test-id="favorites-page-list"
						>
							{lists.map((list) => (
								<li
									key={list._id}
									className={classes.favoriteItem}
									onClick={() => handleListSelect(list)}
									data-test-id="favorites-page-list-item"
								>
									<Typography variant="h4" className={classes.listItem}>
										{list.name}
									</Typography>
								</li>
							))}
						</ul>
					) : (
						<Typography
							variant="body1"
							className={classes.spacingTop}
							align="center"
							data-test-id="favorites-page-body-text"
						>
							You haven't created any lists yet.
						</Typography>
					)}
				</Grid>
			)}
			{list && (
				<Grid item container xs={12} className={classes.spacingTop}>
					{loadingResources ? (
						<Loading />
					) : (
						<Grid item xs={12}>
							{resources.map(
								(resource) =>
									resource && (
										<ResourceListItem
											format={'favoritesMobile'}
											isOnPublicList={publicList}
											handleMessageNew={handleMessageNew}
											handleListRemoveFavorite={handleRemoveFavorite}
											isOnFavoritesList
											history={history}
											locale={locale}
											key={resource._id}
											resource={resource}
											session={session}
											user={user}
											userData={userData}
											isOwner={isOwner}
										/>
									)
							)}
						</Grid>
					)}
					{!loadingResources && list && resources.length === 0 && (
						<Typography variant="body1" data-test-id="favorites-page-body-text">
							You haven't added any resources to this list yet.
						</Typography>
					)}
				</Grid>
			)}
		</Grid>
	);
};

FavoritesListMobile.defaultProps = {
	anchorEl: null,
	list: null,
	session: null,
	user: null
};

FavoritesListMobile.propTypes = {
	anchorEl: PropTypes.object,
	classes: PropTypes.object.isRequired,
	dialog: PropTypes.string.isRequired,
	handleListSelect: PropTypes.func.isRequired,
	handleMenuOpen: PropTypes.func.isRequired,
	handleMenuClose: PropTypes.func.isRequired,
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired,
	handleRemoveFavorite: PropTypes.func.isRequired,
	handleFavoriteUpdate: PropTypes.func,
	loadingResources: PropTypes.bool.isRequired,
	list: PropTypes.object,
	lists: PropTypes.arrayOf(PropTypes.object).isRequired,
	open: PropTypes.bool.isRequired,
	resources: PropTypes.arrayOf(PropTypes.object).isRequired,
	session: PropTypes.string,
	user: PropTypes.string,
	hasAccess: PropTypes.bool.isRequired,
	isOwner: PropTypes.bool.isRequired
};

export default withStyles(styles)(FavoritesListMobile);
