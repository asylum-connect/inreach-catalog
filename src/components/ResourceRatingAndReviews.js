import PropTypes from 'prop-types';
import React from 'react';
import {withStyles} from '@material-ui/core/styles';

import RatingControl from './ResourceRatingControl';
import ReviewCount from './ResourceReviewCount';

const styles = (theme) => ({
	ratingSpacing: {
		marginRight: theme.spacing(2)
	}
});

const RatingAndReviews = ({rating, total, classes}) => (
	<div data-test-id="resource-rating">
		<RatingControl rating={rating} className={classes.ratingSpacing} />
		{total ? <ReviewCount total={total} /> : null}
	</div>
);

RatingAndReviews.defaultProps = {
	total: 0,
	rating: 0
};
RatingAndReviews.propTypes = {
	total: PropTypes.number,
	rating: PropTypes.number.isRequired
};

export default withStyles(styles)(RatingAndReviews);
