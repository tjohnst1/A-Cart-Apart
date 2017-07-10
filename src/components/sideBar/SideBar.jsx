import React from 'react';
import classNames from 'classnames';
import FilterIcon from '../icons/FilterIcon';
import Filter from '../filter/Filter';
import './sidebar.scss';

const SideBar = (props) => {
  const { handleToggleFilter, showFilter } = props;
  const sidebarClasses = classNames({
    "sidebar__container": true,
    "show-filter": showFilter,
  })

  return (
    <div className={sidebarClasses}>
      <div className="sidebar__primary">
        <button className="sidebar__btn" onClick={() => handleToggleFilter()}>
          <FilterIcon />
          Filter
        </button>
      </div>
      <div className="sidebar__secondary">
        <Filter />
      </div>
    </div>
  );
}

export default SideBar;
