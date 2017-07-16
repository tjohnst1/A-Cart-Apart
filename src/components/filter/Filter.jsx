import React from 'react';
import { kebabCase } from 'lodash';
import { connect } from 'react-redux';
import { filterMarkers } from '../../actions/map'
import './filter.scss';

const Filter = (props) => {
  const { categories, filter, showFilter, handleFilterMarkers } = props;

  const filterCheckboxes = categories.map((category, i) => {
    const formattedName = kebabCase(category)
    return (
      <div className="filter__input-group" key={i}>
        <label htmlFor={kebabCase(formattedName)}>
          <input id={formattedName} name={formattedName} type="checkbox" onChange={() => handleFilterMarkers(category)}/> {category}
          <div className="control-indicator"></div>
        </label>
      </div>
    )
  })

  if (showFilter){
    return (
      <div className="filter__container">
        <h3 className="filter__headline">Categories</h3>
        {filterCheckboxes}
      </div>
    );
  } else {
    return null;
  }


}

function mapStateToProps(state) {
  const { categories } = state.cartData;
  const { filter, showFilter } = state.map;
  return {
    categories,
    filter,
    showFilter,
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
