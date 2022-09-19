// Dev/Staging config is the base
const base = {
	apiDomain: 'https://inreach-api-staging.herokuapp.com',
	apiBasePath: '/v1',
	googleAnalyticsKey: 'UA-76058112-1'
};

const local = {
	apiDomain: 'http://localhost:8080',
	apiBasePath: '/v1'
};

const prod = {
	apiDomain: 'https://inreach-api.herokuapp.com'
};

const env = process.env.REACT_APP_APP_ENV;

export const useIntl = process.env.REACT_APP_USE_INTL == 'TRUE' ? true : false;
console.log(process.env.REACT_APP_USE_INTL);

console.log(useIntl);
export default {
	...base,
	...(env === 'TEST' ? local : {}),
	...(env === 'production' ? prod : {})
};
