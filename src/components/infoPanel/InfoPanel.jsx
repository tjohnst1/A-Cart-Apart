import React from 'react';
import './infoPanel.scss';
import CartInfo from './CartInfo';
import FilterIcon from '../icons/FilterIcon';
import Filter from '../filter/Filter';

const InfoPanel = (props) => {
  const { currentCart, handleToggleFilter } = props;

  return (
    <div className="info-panel">
      <div className="info-panel__headline">
        <h1>A Cart Apart</h1>
        <button onClick={() => handleToggleFilter()}><FilterIcon /><span>Filter</span></button>
      </div>
      <Filter />
      <CartInfo currentCart={currentCart}/>
    </div>
  );
}

export default InfoPanel;
