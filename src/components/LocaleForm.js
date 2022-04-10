import React from 'react';
import {FormattedMessage} from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import AsylumConnectButton from './AsylumConnectButton';
import Language from './Language';
import language from '../utils/language';
import LocaleSelector from './LocaleSelector';
import withWidth from './withWidth';
import {getLocale, setLocale} from '../utils/locale';
import {searchInput, searchInputMobile} from '../theme';

const styles = (theme) => ({
	inputClass: Object.assign(searchInput(theme), {
		cursor: 'pointer',
		position: 'relative',
		boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		marginBottom: '0',
		//boxShadow: '-10px 0px 0px 0px rgba(255,255,255,1), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		[theme.breakpoints.down('md')]: {
			boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
			borderLeft: 'none'
		},
		[theme.breakpoints.down('xs')]: searchInputMobile(theme)
	}),
	listContainerClass: {
		width: '100%!important'
	},
	labelRow: {
		marginBottom: theme.spacing(2),
		[theme.breakpoints.down('xs')]: {
			color: theme.palette.common.white,
			fontSize: theme.typography.h2.fontSize
		}
	},
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
	[theme.breakpoints.down('xs')]: {
		searchButton: {
			textAlign: 'center'
		},
		body2: {
			color: theme.palette.common.white
		},
		link: {
			color: theme.palette.common.white,
			textDecoration: 'underline'
		},
		formContainer: {
			paddingBottom: theme.spacing(8),
			//backgroundColor: theme.palette.common.white,
			marginTop: theme.spacing(1)
		}
	},
	languageIconColor: {
		fill: theme.palette.secondary[400],
		color: theme.palette.secondary[400]
	}
});

class LocaleForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reload: false,
			selectedLanguage: false,
			selectedLanguageName: false,
			selectedLocale: false,
			selectedLocaleName: false,
			startingLang: this.getStartingLanguage(),
			startingLocale: this.getStartingLocale()
		};

		this.getStartingLanguage = this.getStartingLanguage.bind(this);
		this.getStartingLocale = this.getStartingLocale.bind(this);
		this.handleNextClick = this.handleNextClick.bind(this);
		this.handleSelectLanguage = this.handleSelectLanguage.bind(this);
		this.handleSelectLocale = this.handleSelectLocale.bind(this);
	}

	getStartingLanguage() {
		return window.localStorage.getItem('lang')
			? window.localStorage.getItem('lang')
			: 'English';
	}

	getStartingLocale() {
		return window.localStorage.getItem('locale')
			? window.localStorage.getItem('locale')
			: 'en_US';
	}

	handleSelectLanguage = async (languageCode, languageName) => {
		await this.setState({
			selectedLanguage: languageCode,
			selectedLanguageName: languageName
		});
	};

	handleSelectLocale = async (localeCode, localeName) => {
		this.setState({
			selectedLocale: localeCode,
			selectedLocaleName: localeName
		});
	};

	handleNextClick(ev) {
		//need to set defaults if user does not make a selection
		//set language to english and locale to US
		if (this.state.selectedLocaleName === false) {
			this.handleSelectLocale('en_US', '🇺🇸 United States');
			this.getStartingLocale();
		}
		if (this.state.selectedLanguage === undefined) {
			this.handleSelectLanguage('en', 'Engish');
			language.setLanguage('Engish');
		}

		if (this.state.selectedLocale) {
			this.props.changeLocale(this.state.selectedLocale);

			if (
				this.state.selectedLocale == 'en_MX' &&
				this.state.selectedLanguage == 'es'
			) {
				this.props.changeLocale('es_MX');
			} else {
				this.props.changeLocale(this.state.selectedLocale);
			}
		}
		if (
			this.state.selectedLanguage == 'en' &&
			this.state.selectedLocale == 'es_MX'
		) {
			this.props.changeLocale('en_MX');
		}

		if (
			this.state.selectedLocale == 'en_US' &&
			this.state.selectedLanguage == 'es'
		) {
			this.props.changeLocale('es_US');
		}

		if (
			this.state.selectedLanguage == 'en' &&
			this.state.selectedLocale == 'es_US'
		) {
			this.props.changeLocale('en_US');
		}

		if (typeof this.props.onLocaleSelect === 'function') {
			this.props.onLocaleSelect(
				this.state.selectedLocale,
				this.state.selectedLanguage,
				this.state.selectedLanguageName !== this.state.startingLang
			);
		}
		/*if(this.state.selectedLanguageName !== this.state.startingLang && allowRedirect) {
      this.setState({
        reload: true
      });
    } */
	}

	componentWillMount() {
		this.setState({
			startingLang: this.getStartingLanguage(),
			selectedLocale: getLocale()
		});
	}

	render() {
		const {
			labelRow,
			searchButton,
			inputClass,
			listContainerClass,
			formContainer,
			languageIconColor
		} = this.props.classes;
		const variant = 'primary';
		const localeLabel = <FormattedMessage id="app.select-country" />;
		return (
			<Grid
				container
				justify="flex-start"
				spacing={6}
				className={formContainer}
			>
				<Grid item xs={12} md={6}>
					<Typography variant="caption" className={labelRow} component="p">
						<FormattedMessage id="language.select-preferred-language" />
					</Typography>
					<Language
						useMobile={false}
						useIcon={true}
						colorClass={languageIconColor}
						inputClass={inputClass}
						autoReload={false}
						listContainerClass={listContainerClass}
						onSelect={this.handleSelectLanguage}
						triggerReload={this.state.reload}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<Typography variant="caption" className={labelRow} component="p">
						<FormattedMessage id="search.search-location-prompt" />
					</Typography>
					<LocaleSelector
						label={localeLabel}
						handleSelectLocale={this.handleSelectLocale}
						selectedLanguage={this.state.selectedLanguage}
					/>
				</Grid>
				<Grid item xs={12} className={searchButton}>
					<AsylumConnectButton
						variant={variant}
						testIdName="search-page-next-button"
						onClick={this.handleNextClick}
					>
						<FormattedMessage id="navigation.next" />
					</AsylumConnectButton>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(withWidth(LocaleForm));
