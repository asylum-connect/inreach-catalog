import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MobileStepper from '@material-ui/core/MobileStepper';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import AsylumConnectButton from './AsylumConnectButton';
import DialogTitle from './DialogTitle';
import DialogSubTitle from './DialogSubTitle';

import AsylumConnectSignupAgreement from './AsylumConnectSignupAgreement';
import OrganizationAutocomplete from './OrganizationAutocomplete';

const LAWYER_TYPE = 'lawyer';
const PROVIDER_TYPE = 'provider';
const SEEKER_TYPE = 'seeker';

const styles = (theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		width: 'auto',
		marginTop: '25px'
	},
	subTitle: {
		fontStyle: 'italic',
		marginBottom: '24px',
		borderBottom: '1px'
	},
	greyLine: {
		width: 'auto',
		height: '1px',
		backgroundColor: theme.palette.common.darkGrey,
		marginTop: `${theme.spacing(3)}px`
	},
	flex: {display: 'flex'},
	link: {
		color: theme.palette.secondary[500],
		cursor: 'pointer',
		fontSize: '16px',
		fontWeight: '600',
		lineHeight: '20px',
		marginTop: '48px'
	},
	question: {
		fontSize: '18px',
		fontWeight: '600',
		lineHeight: '25px',
		marginBottom: '48px',
		marginTop: `${theme.spacing(4.5)}px`
	},
	orgBody1: {
		fontSize: '18px',
		fontWeight: '400',
		lineHeight: '24px',
		marginBottom: '17px'
	},
	orgBody2: {
		fontSize: '16px',
		fontWeight: '400',
		lineHeight: '24px',
		marginBottom: '64px'
	},
	marginBottom: {marginBottom: '2rem'},
	marginBottomLg: {marginBottom: '3rem'},
	marginVertical: {margin: '2rem 0'},
	stepperSpacing0: {
		marginTop: '28px',
		marginBottom: '64px'
	},
	stepperSpacing1: {
		marginTop: '24px',
		marginBottom: '8px'
	},
	stepperSpacing2: {
		marginTop: '24px',
		marginBottom: '60px'
	},
	backgroundTransparent: {backgroundColor: 'transparent'},
	cursor: {cursor: 'pointer', color: theme.palette.secondary[400]},
	backButton: {
		marginLeft: '48px',
		marginBottom: '36px'
	},
	formContainer: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		marginLeft: '48px',
		marginRight: '36px',
		marginTop: '24px'
	},
	formQuestion: {
		textAlign: 'left',
		fontSize: '16px',
		fontWeight: '600',
		lineHeight: '24.51px',
		marginBottom: '24px'
	},
	formQuestion2: {
		textAlign: 'left',
		fontSize: '16px',
		fontWeight: '400',
		lineHeight: '20px'
	},
	formStatement: {
		textAlign: 'center',
		fontSize: '14px',
		fontWeight: '400',
		lineHeight: '24px',
		marginTop: '24px'
	},
	labels: {
		textAlign: 'left',
		paddingLeft: '.25rem',
		marginBottom: '.25rem',
		marginTop: '1rem'
	},
	gridTxtAlign: {
		textAlign: 'left'
	},
	nextBtn: {
		marginTop: '24px',
		marginBottom: 'unset'
	},
	borderOutline: {
		borderWidth: '2px',
		//border box colors
		//border color when not hover or focus, darkGrey: '#e9e9e9', but have to use code not theme
		'& .MuiOutlinedInput-root': {
			borderColor: '#e9e9e9'
		},
		//border color when hover, light black, 'rgba(29, 31, 35, .5)', but have to use code not theme
		'&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
			borderColor: 'rgba(29, 31, 35, .5)'
		},
		//border color on focus, blue with box shadow but have to use code not theme
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
			borderColor: '#5073B3',
			boxShadow: '0px 0px 10px rgba(80, 115, 179, 0.5)'
		},
		//border color with error
		'& .MuiOutlinedInput-root.Mui-error': {
			borderColor: 'red'
		},

		//input box text color is black under all conditions except error
		'& .MuiOutlinedInput-input': {
			color: '#1D1F23'
		},
		'&:hover .MuiOutlinedInput-input': {
			color: 'black'
		},
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
			color: '#1D1F23'
		},

		//Input label
		'& .MuiInputLabel-outlined': {
			color: 'grey'
		},
		'&:hover .MuiInputLabel-outlined': {
			color: 'brown'
		},
		'& .MuiInputLabel-outlined.Mui-focused': {
			color: 'maroon'
		},

		//helper text
		'& .MuiFormHelperText-root': {
			color: 'green',
			fontSize: '12px'
		},
		'& .MuiFormHelperText-root.Mui-error': {
			color: 'red',
			fontSize: '12px'
		}
	}
});

const SignupForm = (props) => {
	const {
		activeStep,
		classes,
		email,
		name,
		handleBlurOrganizations,
		handleChange,
		handleChangeArray,
		handleCreateAffiliation,
		handleMessageNew,
		handleOrganizationSearchChange,
		handleOrganizationSelect,
		handleOrganizationsFetchRequested,
		handleOrganizationsClearRequested,
		handleRequestClose,
		handleRequestOpen,
		handleSelect,
		handleSignUp,
		handleStepNext,
		handleStepBack,
		handleUpdateUser,
		isLoadingOrganizations,
		locale,
		organizations,
		organizationSearch,
		organizationSelection,
		password,
		passwordConfirmation,
		selection,
		currentLocation,
		selectedOrgType,
		orgType,
		specifiedOrgType,
		immigrationStatus,
		countryOfOrigin,
		sogIdentity,
		ethnicityRace,
		age
	} = props;

	const dialogTitle =
		activeStep < 3 ? (
			<FormattedMessage id="account.sign-up" />
		) : activeStep === 3 || activeStep === 4 ? (
			<FormattedMessage id="organization-affiliation-title" />
		) : activeStep > 4 && activeStep < 12 ? (
			<FormattedMessage id="account.signup-about-you" />
		) : null;

	const dialogSubTitle =
		activeStep < 3 ? (
			<FormattedMessage id="account.signup-subtitle" />
		) : (activeStep === 3 || activeStep === 4) && selection === LAWYER_TYPE ? (
			<FormattedMessage id="organization-law-affiliation-subtitle" />
		) : (activeStep === 3 || activeStep === 4) &&
		  selection === PROVIDER_TYPE ? (
			<FormattedMessage id="organization-provider-affiliation-subtitle" />
		) : activeStep > 4 && activeStep < 12 ? (
			<FormattedMessage id="account.signup-about-you-subtitle" />
		) : null;

	const emailLabel =
		selection === SEEKER_TYPE ? (
			<FormattedMessage id="form.email" />
		) : selection === LAWYER_TYPE ? (
			<FormattedMessage id="form.lawyer-email" />
		) : (
			<FormattedMessage id="form.organisation-email" />
		);

	const nameLabel =
		selection === SEEKER_TYPE ? (
			<FormattedMessage id="form.name" />
		) : (
			<FormattedMessage id="form.lawyer-organization-name" />
		);

	const nameTest = new RegExp(/\s*(?:[\S]\s*){2}$/);
	const emailTest = new RegExp(/\S+@\S+\.\S+/);
	const pswdTest = new RegExp(
		'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})'
	);
	const locationTest = new RegExp(/\s*(?:[\S]\s*){2}$/);
	const organizationTest = new RegExp(/\s*(?:[\S]\s*){2}$/);

	const [touchedName, setTouchedName] = useState(false);
	const [touchedEmail, setTouchedEmail] = useState(false);
	const [touchedPassword, setTouchedPassword] = useState(false);
	const [touchedLocation, setTouchedLocation] = useState(false);
	const [touchedOrgType, setTouchedOrgType] = useState(false);

	const orgTypeOptions =
		selection === LAWYER_TYPE
			? [
					'Corporate law firm',
					'Law school student clinic',
					'Legal nonprofit',
					'Other (specify)'
			  ]
			: [
					'Healthcare Provider',
					'Government Agency',
					'Nonprofit',
					'Grassroots Direct Services Org',
					'Student Club',
					"N/A (I'm looking for safe resources for friends or family)",
					'Other (specify)'
			  ];

	const aboutYouImmigrationOptions = [
		'Asylum seeker',
		'Asylee (granted asylum)',
		'Dreamer (DATA recipient)',
		'Refugee',
		'Immigrant',
		'None of the above',
		'Prefer not to say'
	];
	const aboutYouCountryOptions = [
		'Africa',
		'Asia',
		'South America',
		'Caribbean Islands',
		'North America',
		'Central America',
		'Middle East',
		'Europe',
		'Prefer not to say',
		'Other (specify)'
	];
	const aboutYouSogOptions = [
		'Lesbian',
		'Gay',
		'Bisexual',
		'Transgender',
		'Queer',
		'Questioning',
		'Intersex',
		'Asexual',
		'Pansexual',
		'Nonbinary',
		'Ally',
		'Straight',
		'Woman',
		'Man',
		'Prefer not to say',
		'Other (specify)'
	];
	const aboutYouEthnicityOptions = [
		'African, Middle Eastern',
		'African American, Black',
		'Afro Caribbean, Black',
		'Asian, Asian American',
		'Hispanic/Latinx',
		'Indian',
		'Indigenous, Native Person',
		'Pacific Islander',
		'White, Caucasian',
		'Prefer not to say',
		'Other (specify)'
	];
	const aboutYouAgeOptions = [
		'Under 18',
		'18-25',
		'26-35',
		'36-45',
		'46-55',
		'56-65',
		'66-75',
		'76 and older',
		'Prefer not to say'
	];

	const handleTouchName = () => {
		setTouchedName(true);
	};

	const handleTouchEmail = () => {
		setTouchedEmail(true);
	};

	const handleTouchPassword = () => {
		setTouchedPassword(true);
	};

	const handleTouchLocation = () => {
		setTouchedLocation(true);
	};

	const handleTouchOrgType = () => {
		setTouchedOrgType(true);
	};

	const isValid = () => {
		if (
			name &&
			nameTest.test(name) === true &&
			email &&
			emailTest.test(email) === true &&
			password &&
			pswdTest.test(password) === true
		) {
			return true;
		}

		return false;
	};

	const isOrgValid = () => {
		if (
			name &&
			nameTest.test(name) === true &&
			currentLocation &&
			locationTest.test(currentLocation) === true
		) {
			if (
				(orgType && orgType !== 'Other (specify)') ||
				(orgType === 'Other (specify)' &&
					organizationTest.test(specifiedOrgType) === true)
			) {
				return true;
			}
		}

		return false;
	};

	return (
		<div
			className={classes.container}
			data-test-id="sign-up-form-base-container"
		>
			<DialogTitle>{dialogTitle}</DialogTitle>
			<DialogSubTitle>{dialogSubTitle}</DialogSubTitle>
			<div className={classes.greyLine} />
			{activeStep === 0 && (
				<div data-test-id="sign-up-catalog-type">
					<Typography className={classes.question} variant="h3">
						<FormattedMessage id="account.signup-catalog-type-selection-prompt" />
					</Typography>
					<AsylumConnectButton
						className={classes.marginBottom}
						onClick={() => handleSelect(SEEKER_TYPE)}
						variant="primary"
						testIdName="dialog-container-sign-up-help-myself-button"
					>
						<FormattedMessage id="account.signup-catalog-type-asylum-seeker" />
					</AsylumConnectButton>
					<AsylumConnectButton
						className={classes.marginBottom}
						onClick={() => handleSelect(LAWYER_TYPE)}
						variant="primary"
						testIdName="dialog-container-sign-up-attorney-button"
					>
						<FormattedMessage id="account.signup-catalog-type-legal-provider" />
					</AsylumConnectButton>
					<AsylumConnectButton
						className={classes.marginBottomLg}
						onClick={() => handleSelect(PROVIDER_TYPE)}
						variant="primary"
						testIdName="dialog-container-sign-up-non-legal-service-provider-button"
					>
						<FormattedMessage id="account.signup-catalog-type-non-legal-provider" />
					</AsylumConnectButton>
					<div
						onClick={() => handleRequestOpen('login')}
						data-test-id="dialog-container-sign-up-already-have-account"
					>
						<Typography variant="body1">
							<span className={classes.link}>
								<FormattedMessage id="account.already-have-account" />
							</span>
						</Typography>
					</div>
				</div>
			)}
			{activeStep === 1 && (
				<form
					className={classes.formContainer}
					onSubmit={handleStepNext}
					data-test-id="name-location-form"
				>
					<FormLabel
						required
						className={classes.labels}
						classes={classes.fontWeightMedium}
						margin="none"
					>
						{nameLabel}
					</FormLabel>
					<TextField
						onBlur={handleTouchName}
						error={touchedName && nameTest.test(name) === false}
						helperText={
							touchedName && nameTest.test(name) === false ? (
								<FormattedMessage id="error.name-format" />
							) : touchedName && nameTest.test(name) === true ? (
								<FormattedMessage id="form.name-valid" />
							) : null
						}
						id="name"
						margin="none"
						name="name"
						onChange={handleChange}
						required
						type="text"
						value={name ?? ''}
						placeholder="John Smith"
						data-test-id="sign-up-form-name-input"
						InputLabelProps={{shrink: true}}
						variant="outlined"
						className={classes.borderOutline}
						InputProps={{
							classes: {
								input: classes.borderOutline,
								notchedOutline: classes.borderOutline
							}
						}}
					/>
					<FormLabel
						required
						className={classes.labels}
						classes={classes.fontWeightMedium}
						margin="none"
					>
						Current Location
					</FormLabel>
					<TextField
						onBlur={handleTouchLocation}
						error={
							touchedLocation && locationTest.test(currentLocation) === false
						}
						helperText={
							touchedLocation &&
							locationTest.test(currentLocation) === false ? (
								<FormattedMessage id="error.location-format" />
							) : touchedLocation &&
							  locationTest.test(currentLocation) === true ? (
								<FormattedMessage id="form.location-valid" />
							) : null
						}
						id="currentLocation"
						margin="none"
						name="currentLocation"
						onChange={handleChange}
						required
						type="text"
						value={currentLocation}
						placeholder="San Francisco"
						data-test-id="sign-up-form-location-input"
						InputLabelProps={{shrink: true}}
						variant="outlined"
						className={classes.borderOutline}
						InputProps={{
							classes: {
								input: classes.borderOutline,
								notchedOutline: classes.borderOutline
							}
						}}
					/>
					<Typography className={classes.formQuestion} variant="h3">
						{selection === LAWYER_TYPE
							? 'Where do you practice law? *'
							: 'Where do you work or volunteer? *'}
					</Typography>
					<RadioGroup
						name="orgType"
						value={orgType}
						onChange={handleChange}
						required={true}
					>
						<Grid container spacing={0} className={classes.gridTxtAlign}>
							{orgTypeOptions.map((type, index) => (
								<Grid item xs={6}>
									<FormControlLabel
										key={type}
										value={type}
										control={<Radio />}
										label={type}
									/>
								</Grid>
							))}
						</Grid>
					</RadioGroup>
					{orgType === 'Other (specify)' ? (
						<>
							<FormLabel
								required
								className={classes.labels}
								classes={classes.fontWeightMedium}
								margin="none"
							>
								{selection === LAWYER_TYPE
									? 'I practice law here:'
									: 'I work/volunteer here:'}
							</FormLabel>
							<TextField
								onBlur={handleTouchOrgType}
								error={
									touchedOrgType &&
									organizationTest.test(specifiedOrgType) === false
								}
								helperText={
									touchedOrgType &&
									organizationTest.test(specifiedOrgType) === false ? (
										<FormattedMessage id="error.org-format" />
									) : touchedOrgType &&
									  locationTest.test(specifiedOrgType) === true ? (
										<FormattedMessage id="form.org-valid" />
									) : null
								}
								id="specifiedOrgType"
								margin="none"
								name="specifiedOrgType"
								onChange={handleChange}
								required
								type="text"
								value={specifiedOrgType}
								placeholder="Specify here"
								data-test-id="sign-up-form-orgType-input"
								InputLabelProps={{shrink: true}}
								variant="outlined"
								className={classes.borderOutline}
								InputProps={{
									classes: {
										input: classes.borderOutline,
										notchedOutline: classes.borderOutline
									}
								}}
							/>
						</>
					) : null}
					<AsylumConnectButton
						disabled={isOrgValid() === false ? true : false}
						testIdName="sign-up-form-next-button"
						variant="primary"
						className={classes.nextBtn}
					>
						<FormattedMessage id="navigation.next" />
					</AsylumConnectButton>
				</form>
			)}
			{activeStep === 2 && (
				<form
					className={classes.formContainer}
					onSubmit={handleSignUp}
					data-test-id="name-email-password-form"
				>
					{selection === SEEKER_TYPE ? (
						<>
							<FormLabel
								required
								className={classes.labels}
								classes={classes.fontWeightMedium}
								margin="none"
							>
								{nameLabel}
							</FormLabel>
							<TextField
								onBlur={handleTouchName}
								error={touchedName && nameTest.test(name) === false}
								helperText={
									touchedName && nameTest.test(name) === false ? (
										<FormattedMessage id="error.name-format" />
									) : touchedName && nameTest.test(name) === true ? (
										<FormattedMessage id="form.name-valid" />
									) : null
								}
								id="name"
								margin="none"
								name="name"
								onChange={handleChange}
								required
								type="text"
								value={name ?? ''}
								placeholder="John Smith"
								data-test-id="sign-up-form-name-input"
								InputLabelProps={{shrink: true}}
								variant="outlined"
								className={classes.borderOutline}
								InputProps={{
									classes: {
										input: classes.borderOutline,
										notchedOutline: classes.borderOutline
									}
								}}
							/>
						</>
					) : null}
					<FormLabel required className={classes.labels} margin="none">
						{emailLabel}
					</FormLabel>
					<TextField
						onBlur={handleTouchEmail}
						error={touchedEmail && emailTest.test(email) === false}
						helperText={
							touchedEmail && emailTest.test(email) === false ? (
								<FormattedMessage id="error.email-format" />
							) : touchedEmail && emailTest.test(email) === true ? (
								<FormattedMessage id="form.email-valid" />
							) : null
						}
						id="email"
						margin="none"
						name="email"
						onChange={handleChange}
						required
						type="email"
						value={email}
						placeholder="john@gmail.com"
						data-test-id="sign-up-form-email-input"
						InputLabelProps={{shrink: true}}
						variant="outlined"
						className={classes.borderOutline}
						InputProps={{
							classes: {
								input: classes.borderOutline,
								notchedOutline: classes.borderOutline
							}
						}}
					/>
					<FormLabel required className={classes.labels} margin="none">
						<FormattedMessage id="form.password" />
					</FormLabel>
					<TextField
						onBlur={handleTouchPassword}
						error={touchedPassword && pswdTest.test(password) === false}
						helperText={
							touchedPassword && pswdTest.test(password) === false ? (
								<FormattedMessage id="error.password-format" />
							) : touchedPassword && pswdTest.test(password) === true ? (
								<FormattedMessage id="form.password-valid" />
							) : null
						}
						id="password"
						margin="none"
						name="password"
						onChange={handleChange}
						required
						type="password"
						value={password}
						placeholder="***"
						data-test-id="sign-up-form-password-input"
						InputLabelProps={{shrink: true}}
						variant="outlined"
						className={classes.borderOutline}
						InputProps={{
							classes: {
								input: classes.borderOutline,
								notchedOutline: classes.borderOutline
							}
						}}
					/>
					<AsylumConnectSignupAgreement />
					<AsylumConnectButton
						disabled={isValid() === false ? true : false}
						testIdName="sign-up-form-submit-button"
						variant="primary"
						className={classes.noBottomMargin}
					>
						<FormattedMessage id="account.sign-up" />
					</AsylumConnectButton>
				</form>
			)}
			{activeStep === 3 && (
				<form
					className={classes.formContainer}
					onSubmit={handleCreateAffiliation}
				>
					<Typography
						variant="body1"
						className={classes.labels}
						data-test-id="sign-up-form-header-text"
						align="left"
					>
						<FormattedMessage id="form.organization-name-title" />
					</Typography>
					<OrganizationAutocomplete
						handleBlurOrganizations={handleBlurOrganizations}
						handleMessageNew={handleMessageNew}
						handleOrganizationSearchChange={handleOrganizationSearchChange}
						handleOrganizationSelect={handleOrganizationSelect}
						handleOrganizationsFetchRequested={
							handleOrganizationsFetchRequested
						}
						handleOrganizationsClearRequested={
							handleOrganizationsClearRequested
						}
						handleRequestClose={handleRequestClose}
						isLoadingOrganizations={isLoadingOrganizations}
						locale={locale}
						organizationSearch={organizationSearch}
						organizationSelection={organizationSelection}
						organizations={organizations}
					/>
					<div className={classes.marginVertical}>
						<AsylumConnectButton
							disabled={organizationSelection === null ? true : false}
							variant="primary"
							testIdName="sign-up-form-join-organization-button"
							type="submit"
						>
							<FormattedMessage id="account.join-organisation" />
						</AsylumConnectButton>
					</div>
					<Typography variant="body1" data-test-id="sign-up-form-body-text">
						<FormattedMessage id="account.join-organisation-later" />
					</Typography>
					<Typography
						className={classes.cursor}
						variant="body1"
						data-test-id="sign-up-form-skip-text"
						onClick={() => handleRequestOpen('thankyou')}
					>
						<FormattedMessage id="action.skip" />
					</Typography>
				</form>
			)}
			{activeStep === 4 && (
				<form>
					<div className={classes.marginVertical}>
						<Typography
							variant="body1"
							className={classes.orgBody1}
							data-test-id="sign-up-form-org-request-rcv"
						>
							<FormattedMessage id="account.join-organisation-request-received" />
						</Typography>
						<Typography
							variant="body1"
							className={classes.orgBody2}
							data-test-id="sign-up-form-org-request-next"
						>
							<FormattedMessage id="account.join-organization-next-step" />
						</Typography>
					</div>
					<div className={classes.marginVertical}>
						<AsylumConnectButton
							variant="primary"
							testIdName="sign-up-form-finish-registration-button"
							onClick={() => handleRequestOpen('thankyou')}
						>
							<FormattedMessage id="account.finish-registration" />
						</AsylumConnectButton>
					</div>
				</form>
			)}
			{activeStep === 5 && <div>Org about you placeholder</div>}
			{activeStep === 6 && (
				<form className={classes.formContainer} onSubmit={handleUpdateUser}>
					<Typography className={classes.formQuestion} variant="h3">
						I am a(n)..
					</Typography>
					<RadioGroup
						name="immigrationStatus"
						onChange={handleChange}
						required={true}
					>
						<Grid container spacing={0} className={classes.gridTxtAlign}>
							{aboutYouImmigrationOptions.map((type, index) => (
								<Grid item xs={6}>
									<FormControlLabel
										key={type}
										value={type}
										control={<Radio />}
										label={type}
									/>
								</Grid>
							))}
						</Grid>
					</RadioGroup>
					<AsylumConnectButton
						// disabled={isOrgValid() === false ? true : false}
						testIdName="sign-up-form-next-button"
						variant="primary"
						className={classes.nextBtn}
					>
						<FormattedMessage id="navigation.next" />
					</AsylumConnectButton>
				</form>
			)}
			{activeStep === 7 && (
				<form className={classes.formContainer} onSubmit={handleUpdateUser}>
					<Typography className={classes.formQuestion} variant="h3">
						My country of origin is in..
					</Typography>
					<RadioGroup
						name="countryOfOrigin"
						onChange={handleChange}
						required={true}
					>
						<Grid container spacing={0} className={classes.gridTxtAlign}>
							{aboutYouCountryOptions.map((type, index) => (
								<Grid item xs={6}>
									<FormControlLabel
										key={type}
										value={type}
										control={<Radio />}
										label={type}
									/>
								</Grid>
							))}
						</Grid>
					</RadioGroup>
					<AsylumConnectButton
						// disabled={isOrgValid() === false ? true : false}
						testIdName="sign-up-form-next-button"
						variant="primary"
						className={classes.nextBtn}
					>
						<FormattedMessage id="navigation.next" />
					</AsylumConnectButton>
				</form>
			)}
			{activeStep === 8 && (
				<form className={classes.formContainer} onSubmit={handleUpdateUser}>
					<Typography className={classes.formQuestion} variant="h3">
						I identify as..
					</Typography>
					<Typography className={classes.formQuestion2} variant="h3">
						(Select all that apply)
					</Typography>

					<Grid container spacing={0} className={classes.gridTxtAlign}>
						{aboutYouSogOptions.map((type, index) => (
							<Grid item xs={4}>
								<FormControlLabel
									key={type}
									value={type}
									control={<Checkbox />}
									label={type}
									name="sogIdentity"
									onChange={handleChangeArray}
								/>
							</Grid>
						))}
					</Grid>

					<AsylumConnectButton
						// disabled={isOrgValid() === false ? true : false}
						testIdName="sign-up-form-next-button"
						variant="primary"
						className={classes.nextBtn}
					>
						<FormattedMessage id="navigation.next" />
					</AsylumConnectButton>
				</form>
			)}
			{activeStep === 9 && (
				<form className={classes.formContainer} onSubmit={handleUpdateUser}>
					<Typography className={classes.formQuestion} variant="h3">
						My ethnicity/race is..
					</Typography>
					<Typography className={classes.formQuestion2} variant="h3">
						(Select all that apply)
					</Typography>

					<Grid container spacing={0} className={classes.gridTxtAlign}>
						{aboutYouEthnicityOptions.map((type, index) => (
							<Grid item xs={6}>
								<FormControlLabel
									key={type}
									value={type}
									control={<Checkbox />}
									label={type}
									name="ethnicityRace"
									onChange={handleChangeArray}
								/>
							</Grid>
						))}
					</Grid>
					<AsylumConnectButton
						// disabled={isOrgValid() === false ? true : false}
						testIdName="sign-up-form-next-button"
						variant="primary"
						className={classes.nextBtn}
					>
						<FormattedMessage id="navigation.next" />
					</AsylumConnectButton>
				</form>
			)}
			{activeStep === 10 && (
				<form className={classes.formContainer} onSubmit={handleUpdateUser}>
					<Typography className={classes.formQuestion} variant="h3">
						How old are you?
					</Typography>
					<RadioGroup name="age" onChange={handleChange} required={true}>
						<Grid container spacing={0} className={classes.gridTxtAlign}>
							{aboutYouAgeOptions.map((type, index) => (
								<Grid item xs={6}>
									<FormControlLabel
										key={type}
										value={type}
										control={<Radio />}
										label={type}
									/>
								</Grid>
							))}
						</Grid>
					</RadioGroup>
					<AsylumConnectButton
						// disabled={isOrgValid() === false ? true : false}
						testIdName="sign-up-form-next-button"
						variant="primary"
						className={classes.nextBtn}
					>
						<FormattedMessage id="action.submit" />
					</AsylumConnectButton>
				</form>
			)}
			{activeStep > 5 && activeStep < 11 && (
				<Typography className={classes.formStatement} variant="h5">
					You may complete this information later in Account Settings.
				</Typography>
			)}
			{activeStep < 3 && (
				<MobileStepper
					className={
						classes.stepperSpacing0 + ' ' + classes.backgroundTransparent
					}
					type="dots"
					steps={selection === SEEKER_TYPE || selection === '' ? 2 : 3}
					position="static"
					activeStep={
						selection === SEEKER_TYPE && activeStep > 0
							? activeStep - 1
							: activeStep
					}
					nextButton={<div />}
					backButton={<div />}
				/>
			)}
			{activeStep >= 3 && selection != SEEKER_TYPE && (
				<MobileStepper
					className={
						classes.stepperSpacing1 + ' ' + classes.backgroundTransparent
					}
					type="dots"
					steps={2}
					position="static"
					activeStep={activeStep - 3}
					nextButton={<div />}
					backButton={<div />}
				/>
			)}
			{activeStep > 5 && activeStep < 11 && (
				<MobileStepper
					className={
						activeStep === 6
							? classes.stepperSpacing2
							: classes.stepperSpacing1 + ' ' + classes.backgroundTransparent
					}
					type="dots"
					steps={5}
					position="static"
					activeStep={activeStep - 6}
					nextButton={<div />}
					backButton={<div />}
				/>
			)}
			{(activeStep === 1 || activeStep === 2) && (
				<div className={classes.flex + ' ' + classes.backButton}>
					<Button
						data-test-id="sign-up-form-back-button"
						size="small"
						onClick={handleStepBack}
					>
						<KeyboardArrowLeft />
						<FormattedMessage id="navigation.back" />
					</Button>
				</div>
			)}
			{activeStep > 6 && activeStep < 11 && (
				<div className={classes.flex + ' ' + classes.backButton}>
					<Button
						data-test-id="sign-up-form-back-button"
						size="small"
						onClick={handleStepBack}
					>
						<KeyboardArrowLeft />
						<FormattedMessage id="navigation.back" />
					</Button>
				</div>
			)}
		</div>
	);
};

SignupForm.defaultProps = {
	organizationSelection: null
};

SignupForm.propTypes = {
	activeStep: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
	email: PropTypes.string.isRequired,
	handleBlurOrganizations: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleCreateAffiliation: PropTypes.func.isRequired,
	handleOrganizationSearchChange: PropTypes.func.isRequired,
	handleOrganizationSelect: PropTypes.func.isRequired,
	handleOrganizationsFetchRequested: PropTypes.func.isRequired,
	handleOrganizationsClearRequested: PropTypes.func.isRequired,
	handleRequestClose: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired,
	handleSelect: PropTypes.func.isRequired,
	handleSignUp: PropTypes.func.isRequired,
	handleStepBack: PropTypes.func.isRequired,
	handleStepNext: PropTypes.func.isRequired,
	organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
	organizationSearch: PropTypes.string.isRequired,
	organizationSelection: PropTypes.object,
	password: PropTypes.string.isRequired,
	passwordConfirmation: PropTypes.string.isRequired,
	selection: PropTypes.string.isRequired
};

export default withStyles(styles)(SignupForm);
