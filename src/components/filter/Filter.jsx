import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase, uniqueId } from 'lodash';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { filterMarkers } from '../../actions/map';
import './filter.scss';

const Filter = (props) => {
  const { categories, filter, handleFilterMarkers } = props;
  const filterCheckboxes = categories.map((category) => {
    const formattedName = kebabCase(category);
    const checkboxClasses = classNames({
      'control-indicator': true,
      active: filter.indexOf(category) !== -1,
    });

    return (
      <div className="filter__input-group" key={uniqueId()}>
        <label htmlFor={kebabCase(formattedName)}>
          <input id={formattedName} name={formattedName} type="checkbox" onChange={() => handleFilterMarkers(category)} /> {category}
          <div className={checkboxClasses} />
        </label>
      </div>
    );
  });

  return (
    <div className="filter__container">
      <h3 className="filter__headline">Categories</h3>
      {filterCheckboxes}
    </div>
  );
};

function mapStateToProps(state) {
  const { categories } = state.cartData;
  const { filter } = state.map;
  return {
    categories,
    filter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleFilterMarkers: (tag) => {
      dispatch(filterMarkers(tag));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

Filter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleFilterMarkers: PropTypes.func.isRequired,
  filter: PropTypes.arrayOf(PropTypes.string).isRequired,
};
