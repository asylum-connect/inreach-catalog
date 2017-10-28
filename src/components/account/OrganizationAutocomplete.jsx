import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import Fa from 'react-fontawesome';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

function renderInput(inputProps) {
  const { classes, autoFocus, value, ref, isLoading } = inputProps;
  delete inputProps['isLoading'];

  return (
    <TextField
      autoFocus={autoFocus}
      className={classes.textField}
      label={<span>Organization Name {isLoading ? <Fa name="spinner" spin/> : ``}</span>}
      value={value}
      inputRef={ref}
      InputProps={Object.assign(
        {},
        inputProps,
        { classes: { input: classes.input }},
      )}
      required
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={index} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={index} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    zIndex: 1,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  textField: {
    width: '100%',
  },
});

const OrganizationAutocomplete = ({
  classes,
  handleOrganizationSearchChange,
  handleOrganizationSelect,
  handleOrganizationsFetchRequested,
  handleOrganizationsClearRequested,
  isLoadingOrganizations,
  organizations,
  organizationSearch,
}) => (
  <Autosuggest
    theme={{
      container: classes.container,
      suggestionsContainerOpen: classes.suggestionsContainerOpen,
      suggestionsList: classes.suggestionsList,
      suggestion: classes.suggestion,
    }}
    suggestions={organizations}
    onSuggestionsFetchRequested={handleOrganizationsFetchRequested}
    onSuggestionsClearRequested={handleOrganizationsClearRequested}
    onSuggestionSelected={handleOrganizationSelect}
    renderSuggestionsContainer={renderSuggestionsContainer}
    getSuggestionValue={getSuggestionValue}
    renderInputComponent={renderInput}
    renderSuggestion={renderSuggestion}
    inputProps={{
      autoFocus: true,
      classes,
      placeholder: 'Start typing...',
      value: organizationSearch,
      onChange: handleOrganizationSearchChange,
      isLoading: isLoadingOrganizations,
    }}
  />
);

OrganizationAutocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
  handleOrganizationSearchChange: PropTypes.func.isRequired,
  handleOrganizationSelect: PropTypes.func.isRequired,
  handleOrganizationsFetchRequested: PropTypes.func.isRequired,
  handleOrganizationsClearRequested: PropTypes.func.isRequired,
  isLoadingOrganizations: PropTypes.bool.isRequired,
  organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
  organizationSearch: PropTypes.string.isRequired,
};

export default withStyles(styles)(OrganizationAutocomplete);
