import React from 'react';
import PropTypes from 'prop-types';
import './infoPanel.scss';
import CartInfo from './CartInfo';
import FilterIcon from '../icons/FilterIcon';
import Filter from '../filter/Filter';

const InfoPanel = (props) => {
  const { currentCart, handleToggleFilter, showFilter } = props;

  return (
    <div className="info-panel">
      <div className="info-panel__headline">
        <h1>A Cart Apart</h1>
        <button onClick={() => handleToggleFilter()}><FilterIcon /><span>Filter</span></button>
      </div>
      <div className="info-panel__details">
        <Filter />
        { showFilter ? null : <CartInfo currentCart={currentCart} /> }
      </div>
    </div>
  );
}

export default InfoPanel;

InfoPanel.propTypes = {
  currentCart: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    phoneNumber: PropTypes.string,
    hours: PropTypes.object.isRequired,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    website: PropTypes.string.isRequired,
  }),
  handleToggleFilter: PropTypes.func.isRequired,
  showFilter: PropTypes.bool.isRequired,
}
