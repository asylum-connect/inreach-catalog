import React from 'react';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
	bgLightGrey: {backgroundColor: theme.palette.common.lightGrey},
	textCenter: {textAlign: 'center'},
	content: {
		padding: '64px 0',
		margin: '0 10%',
		'@media(max-width:1280px)': {
			margin: '0 2%'
		}
	},
	paddingBottom: {
		'padding-bottom': '16px',
		'line-height': '22px'
	},
	banner1: {
		color: theme.palette.primary[200]
	},
	line: {
		display: 'inline-block',
		width: '30px',
		height: '3px',
		backgroundColor: 'black',
		marginBottom: '4px'
	}
});

const BottomBanner = ({classes}) => {
	const {bgLightGrey, textCenter, content, paddingVertical} = classes;

	return (
		<div className={classNames(textCenter, bgLightGrey)}>
			<div className={classNames(content)}>
				<Typography
					variant="h3"
					className={classes.paddingBottom}
					data-test-id="banner-header"
				>
					<FormattedMessage id="app.banner" />
				</Typography>
				<Typography
					variant="subtitle1"
					data-test-id="banner-text-1"
					className={classes.banner1}
				>
					<FormattedMessage id="app.banner-1" />{' '}
					<span class={classes.line}></span>
				</Typography>
				<Typography variant="subtitle1" data-test-id="banner-text-2">
					<FormattedMessage id="app.banner-2" />
				</Typography>
			</div>
		</div>
	);
};

export default withStyles(styles)(BottomBanner);
