import React from 'react';

const Phone = (props) => {
	const {phone = {}, classes, includeIcon, includeType} = props;
	let icon,
		phoneType = phone?.phone_type ? phone?.phone_type.toLowerCase() : null;
	switch (phoneType) {
		case 'fax':
			icon = 'fa-fax';
			break;
		default:
			icon = 'fa-phone';
	}
	return (
		<a
			data-test-id="resource-phone"
			href={'tel:' + phone?.digits}
			className={classes.bodyLink + ' ' + classes.listLink}
		>
			{includeIcon
				? (() => <i className={'fa ' + icon} aria-hidden="true"></i>)() +
				  '&nbsp;'
				: null}
			{phone?.digits + (includeType && phoneType ? ' (' + phoneType + ')' : '')}
		</a>
	);
};

export default Phone;
