import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from 'react-intl';

const styles = (theme) => ({
	viewYourFavoritesText: {
		color: theme.palette.secondary[500],
		'&:hover': {
			color: theme.palette.secondary[900]
		},
		fontSize: '16px',
		fontWeight: theme.typography.fontWeightMedium,
		lineHeight: 1.5,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '82px',
		height: '48px'
	}
});

const FavoritesLink = ({classes, locale}) => (
	<Link
		to={'/' + locale + '/favorites'}
		className="hide--on-print"
		data-test-id="nav-button-view-favorites"
	>
		<FormattedMessage
			id="favorites.view-favorites"
			defaultMessage="View Your Favorites"
		>
			{(favorites) => (
				<Typography variant="h4" className={classes.viewYourFavoritesText}>
					{favorites}
				</Typography>
			)}
		</FormattedMessage>
	</Link>
);

FavoritesLink.propTypes = {classes: PropTypes.object.isRequired};

export default withStyles(styles)(FavoritesLink);
