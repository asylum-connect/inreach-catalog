import React from 'react';
import Fa from 'react-fontawesome';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {FormattedMessage} from 'react-intl';

import AsylumConnectButton from './AsylumConnectButton';
import AsylumConnectCheckbox from './AsylumConnectCheckbox';
import LocaleSelector from './LocaleSelector';
import AsylumConnectInfographicButton from './AsylumConnectInfographicButton';
import SearchBar from './SearchBar';
import SearchByLocation from './SearchByLocation';
import SearchByOrgName from './SearchByOrgName';
import withWidth from './withWidth';
import {breakpoints, boldFont} from '../theme';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DesktopSearch from './DesktopSearch';

const styles = (theme) => ({
	formRow: {
		marginBottom: theme.spacing(3)
	},
	callout: {
		color: theme.palette.primary[500]
	},
	underline: {
		textDecoration: 'underline',
		'&:hover': {
			color: theme.palette.primary[900]
		}
	},
	secondary: {
		color: theme.palette.secondary[500],
		'&:hover': {
			backgroundColor: 'inherit'
		}
	},
	tooltip: {fontFamily: 'sans-serif'},
	filterContainer: {
		marginTop: '-0.8rem'
	},
	fullBottomMargin: {
		marginBottom: theme.spacing(4),
		[theme.breakpoints.down('xs')]: {
			marginBottom: 0
		}
	},
	halfBottomMargin: {
		marginBottom: theme.spacing(2)
	},
	searchButtonContainer: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(1)
	},
	[theme.breakpoints.down('xs')]: {
		nationalOrgCheckboxContainer: {
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2)
		},
		searchButton: {
			textAlign: 'center'
		},
		body2: {
			color: theme.palette.common.white
		},
		link: {
			color: theme.palette.common.white,
			textDecoration: 'underline'
		}
	},
	[theme.breakpoints.down('xl')]: {
		nationalOrgCheckboxContainer: {
			paddingBottom: theme.spacing(3)
		},
		lowerButton: {
			marginTop: theme.spacing(53),
			marginBottom: theme.spacing(3)
		}
	},
	tabs: {display: 'flex', flex: 1, minWidth: '350px'},
	infographicContainer: {
		paddingBottom: theme.spacing(12),
		paddingTop: theme.spacing(3)
	},
	boldFont: boldFont(theme)
});

class SearchForm extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			moveButton: false,
			tabValue:
				props.match.path === '/:locale/search/name' ||
				props.match.path === '/:locale/search/name/:name/:sort'
					? 1
					: 0
		};
		this.onMoveSearchButton = this.onMoveSearchButton.bind(this);
	}

	onMoveSearchButton(newPosition) {
		if (newPosition !== this.state.moveButton) {
			this.setState({
				moveButton: !this.state.moveButton
			});
		} else if (newPosition === this.state.moveButton) {
			this.setState({
				moveButton: !this.state.moveButton
			});
		}
	}
	handleTabChange = (event, newValue) => {
		this.setState({tabValue: newValue});
		this.props.history.replace(
			newValue === 0
				? `/${this.props.locale}/search`
				: `/${this.props.locale}/search/name`
		);
	};
	a11yProps = (index) => {
		return {
			id: `search-tab-${index}`,
			'aria-controls': `search-tabpanel-${index}`
		};
	};

	render() {
		const {
			nationalOrgCheckboxContainer,
			searchButton,
			searchButtonContainer,
			lowerButton,
			infographicContainer
		} = this.props.classes;
		const {handleOrgSelection, handleSearchByOrgName, locale} = this.props;
		const variant = 'primary';
		const localeLabel = 'Select country';
		const isMobile = this.props.width < breakpoints['sm'];

		return (
			<div>
				{isMobile ? (
					<Grid container>
						<Grid item xs={12}>
							<LocaleSelector
								label={localeLabel}
								setOnChange={true}
								handleSelectLocale={this.props.onLocaleSelect}
								changeLocale={this.props.changeLocale}
							/>
						</Grid>
					</Grid>
				) : null}
				{!isMobile && (
					<DesktopSearch
						handleTabChange={this.handleTabChange}
						{...this.props}
						{...this.state}
					/>
				)}

				{isMobile && (
					<>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography
									component="h3"
									variant="h4"
									className={this.props.classes.boldFont}
								>
									<FormattedMessage
										id="search.search-by-name-tab-heading"
										defaultMessage="Find an organization by name"
									/>
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Grid container>
									<Grid item xs={12}>
										<SearchBar
											{...this.props}
											classes={null}
											moveSearchButton={this.onMoveSearchButton}
											data-test-id="name-searchbar"
											showResourceSelector={false}
										>
											<SearchByOrgName
												handleOrgSelection={handleOrgSelection}
												orgName={this.props.orgName}
												locale={locale}
											/>
										</SearchBar>
									</Grid>
									<Grid
										item
										xs={12}
										container
										spacing={0}
										className={searchButtonContainer}
									>
										<Grid item xs className={searchButton}>
											<AsylumConnectButton
												variant={variant}
												onClick={handleSearchByOrgName}
												disabled={this.props.searchDisabled}
												className={this.state.moveButton ? lowerButton : null}
												testIdName="search-bar-search-button"
											>
												<FormattedMessage
													id="navigation.search"
													defaultMessage="Search"
												/>
												{this.props.searchDisabled ? (
													<Fa
														name="spinner"
														spin
														style={{marginLeft: '0.5rem'}}
													/>
												) : null}
											</AsylumConnectButton>
										</Grid>
									</Grid>
								</Grid>
							</AccordionDetails>
						</Accordion>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography
									component="h3"
									variant="h4"
									className={this.props.classes.boldFont}
								>
									<FormattedMessage
										id="search.search-by-location-tab-heading"
										defaultMessage="Find services near you"
									/>
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Grid container>
									<Grid item xs>
										<SearchBar
											{...this.props}
											classes={null}
											moveSearchButton={this.onMoveSearchButton}
											data-test-id="serchbar"
											showResourceSelector={false}
										>
											<SearchByLocation {...this.props} />
										</SearchBar>
									</Grid>
									<Grid item className={nationalOrgCheckboxContainer}>
										<AsylumConnectCheckbox
											label={
												<FormattedMessage
													id="search.show-national-organisations-country"
													defaultMessage="Show me national organizations who can help anyone located in the country"
												/>
											}
											checked={this.props.isNational}
											onChange={this.props.handleNationalCheckBox}
										/>
									</Grid>
									<Grid
										item
										xs
										className={searchButton}
										style={{paddingBottom: '10px'}}
									>
										<AsylumConnectButton
											variant={variant}
											onClick={this.props.handleSearchButtonClick}
											disabled={this.props.searchDisabled}
											className={this.state.moveButton ? lowerButton : null}
											testIdName="search-bar-search-button"
										>
											<FormattedMessage
												id="navigation.search"
												defaultMessage="Search"
											/>
											{this.props.searchDisabled ? (
												<Fa
													name="spinner"
													spin
													style={{marginLeft: '0.5rem'}}
												/>
											) : null}
										</AsylumConnectButton>
									</Grid>
								</Grid>
							</AccordionDetails>
						</Accordion>
					</>
				)}
				{this.props.infographic && (
					<Grid container className={infographicContainer}>
						<Grid item xs={12} className={searchButton}>
							<FormattedMessage
								id="resources.download-legal-guides"
								defaultMessage="Download Legal Guides on LGBTQ Asylum in the U.S."
							>
								{(text) => (
									<AsylumConnectInfographicButton
										testIdName="search-form-download-link"
										type="link"
										url={
											this.props.infographic.url
												? this.props.infographic.url
												: null
										}
										list={
											this.props.infographic.list
												? this.props.infographic.list
												: null
										}
										text={text}
									/>
								)}
							</FormattedMessage>
						</Grid>
					</Grid>
				)}
			</div>
		);
	}
}

export default withStyles(styles)(withWidth(SearchForm));
