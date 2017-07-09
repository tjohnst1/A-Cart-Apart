import React from 'react';
import { kebabCase } from 'lodash';
import { connect } from 'react-redux';
import { filterMarkers } from '../../actions/map'
import './filter.scss';

const Filter = (props) => {
  const { categories, filter, handleFilterMarkers } = props;

  const filterCheckboxes = categories.map((category, i) => {
    const formattedName = kebabCase(category)
    return (
      <div className="filter__input-group" key={i}>
        <input id={formattedName} name={formattedName} type="checkbox" onChange={() => handleFilterMarkers(category)}/> <label htmlFor={kebabCase(formattedName)}>{category}</label>
      </div>
    )
  })

  return (
    <div>
      <h3>Filters</h3>
      {filterCheckboxes}
    </div>
  )
}

function mapStateToProps(state) {
  const { categories } = state.cartData;
  const { filter } = state.map;
  return {
    categories,
    filter,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleFilterMarkers: (tag) => {
      dispatch(filterMarkers(tag))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
