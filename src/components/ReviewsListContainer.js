import React from 'react';
import {FormattedMessage, useIntl, FormattedDate} from 'react-intl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {breakpoints} from '../theme';

const styles = (theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		width: 'auto'
	},
	tableContainer: {
		width: '80%',
		marginLeft: '10%',
		marginRight: '10%'
	},
	minHeight: {
		height: '300px'
	},
	marginTitle: {
		marginTop: '1.5rem',
		marginBottom: '1.5rem'
	}
});

const ReviewsListContainer = (props) => {
	const {classes, handleChange, handleUpdateUser, comments, session} = props;
	const windowSize = window.innerWidth;
	const isMobile = windowSize < breakpoints['sm'];
	const intl = useIntl();

	return (
		<>
			<Typography
				className={classes.marginTitle}
				variant="h1"
				align="center"
				data-test-id="reviews-page-title-text"
			>
				<FormattedMessage
					id="reviews.title"
					defaultMessage="Your Reviews"
					description="Reviews page title"
				/>
			</Typography>
			{!session && (
				<Typography
					className={classes.minHeight}
					variant="body1"
					align="center"
					data-test-id="reviews-page-header-text"
				>
					<FormattedMessage
						id="reviews.sign-in-to-view"
						defaultMessage="You must be signed in to see your reviews."
						description="Reviews page header for not signed in"
					/>
				</Typography>
			)}
			{session && (
				<TableContainer component={Paper} className={classes.tableContainer}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="left">Organization</TableCell>
								<TableCell align="left">Service</TableCell>
								<TableCell align="left">Comment</TableCell>
								<TableCell align="left">Submitted</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{comments.map((comment) => (
								<TableRow
									key={comment['comments._id']}
									sx={{'&:last-child td, &:last-child th': {border: 0}}}
								>
									<TableCell align="left">{comment.organizationName}</TableCell>
									<TableCell align="left">{comment.serviceName}</TableCell>

									<TableCell align="left">
										{comment['comments.comment']}
									</TableCell>
									<TableCell align="left">
										<FormattedDate
											value={new Date(comment['comments.created_at'])}
											year="numeric"
											month="short"
											day="numeric"
											weekday="short"
										/>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</>
	);
};

export default withStyles(styles)(ReviewsListContainer);
