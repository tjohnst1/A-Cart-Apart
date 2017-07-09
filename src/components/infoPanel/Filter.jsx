import React from 'react';
import { kebabCase } from 'lodash';
import './filter.scss';

const Filter = (props) => {
  const { categories } = props;

  const filterCheckboxes = categories.map((category, i) => {
    const formattedName = kebabCase(category)
    return (
      <div className="filter__input-group" key={i}>
        <input name={formattedName} type="checkbox"/> <label htmlFor={kebabCase(formattedName)}>{category}</label>
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

export default Filter;
