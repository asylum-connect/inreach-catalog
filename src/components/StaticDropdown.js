import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import AsylumConnectSelector from './AsylumConnectSelector';
import AsylumConnectDropdownListItem from './AsylumConnectDropdownListItem';
import Resource from './StaticResource';
import {searchInput} from '../theme';

const styles = (theme) => ({
	textAlignCenter: {
		textAlign: 'center'
	},
	titleMargin: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(1)
	},
	italic: {
		fontStyle: 'italic'
	},
	applyColor: (props) => ({
		color: props?.color
	}),
	inlineBlock: {
		display: 'inline-block'
	},
	dropdownInput: Object.assign(searchInput(theme), {
		cursor: 'pointer',
		position: 'relative',
		marginBottom: '0px'
	}),
	listContainerClass: {
		fontFamily: theme.typography.fontFamily,
		fontSize: theme.typography.fontSize
	}
});

class Dropdown extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			selected: this.props.selected
		};
		this.handleSelect = this.handleSelect.bind(this);
	}

	handleSelect(item) {
		this.setState({
			selected: item
		});
		if (typeof this.props.onSelect === 'function') {
			this.props.onSelect(item);
		}
	}

	render() {
		const {classes, dropdown, label, color, className, dropdownClassName} =
			this.props;
		let {keys} = this.props;
		const containerWidth = '100%';
		var removal = keys.indexOf('label');
		if (removal > -1) {
			keys.splice(removal, 1);
		}
		return (
			<div className={className} data-test-id="static-page-dropdown-container">
				<div className={dropdownClassName}>
					<AsylumConnectSelector
						label={this.state.selected ? this.state.selected : label}
						selected={[]}
						containerWidth={containerWidth}
						containerClass={classes.dropdownInput}
						listContainerClass={classes.listContainerClass}
						closeOnClick={true}
					>
						<List>
							{keys.map((item, index) => (
								<AsylumConnectDropdownListItem
									button
									key={index}
									selected={this.state.selected === item}
									onClick={(event) => this.handleSelect(item)}
								>
									{item}
								</AsylumConnectDropdownListItem>
							))}
						</List>
					</AsylumConnectSelector>
				</div>
				{dropdown &&
				this.state.selected &&
				dropdown[this.state.selected] &&
				dropdown[this.state.selected].length
					? dropdown[this.state.selected].map((resource, index) => (
							<Resource key={index} color={color} {...resource} />
					  ))
					: null}
			</div>
		);
	}
}

Dropdown.propTypes = {
	label: PropTypes.string,
	keys: PropTypes.array,
	dropdown: PropTypes.object
};

export default withStyles(styles)(Dropdown);
