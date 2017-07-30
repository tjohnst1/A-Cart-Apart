import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase, uniqueId } from 'lodash';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { filterMarkers } from '../../actions/map';
import './filter.scss';

const Filter = (props) => {
  const { tags, filter, handleFilterMarkers } = props;
  const filterCheckboxes = tags.map((tag) => {
    const formattedName = kebabCase(tag);
    const checkboxClasses = classNames({
      'control-indicator': true,
      active: filter.searchTerms.indexOf(tag) !== -1,
    });

    return (
      <div className="filter__input-group" key={uniqueId()}>
        <label htmlFor={kebabCase(formattedName)}>
          <input id={formattedName} name={formattedName} type="checkbox" onChange={() => handleFilterMarkers(tag)} /> {tag}
          <div className={checkboxClasses} />
        </label>
      </div>
    );
  });

  return (
    <div className="filter__container">
      <h3 className="filter__headline">Tags</h3>
      {filterCheckboxes}
    </div>
  );
};

function mapStateToProps(state) {
  const { tags } = state.cartData;
  const { filter } = state.map;
  return {
    tags,
    filter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleFilterMarkers: (phrase) => {
      dispatch(filterMarkers(phrase, 'tags'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

Filter.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleFilterMarkers: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    matches: PropTypes.shape({
      tags: PropTypes.arrayOf(PropTypes.string),
      names: PropTypes.arrayOf(PropTypes.string),
    }),
    cartData: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
