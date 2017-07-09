import React from 'react';
import './infoPanel.scss';
import CartInfo from './CartInfo';

const InfoPanel = (props) => {
  const { currentCart, handleToggleFilter } = props;
  return (
    <div className="info-panel">
      <div className="info-panel__headline-container">
        <h1 className="info-panel__headline">A Cart Apart</h1>
        <button className="info-panel__filter-btn" onClick={() => handleToggleFilter()}>Filter</button>
      </div>
      <CartInfo currentCart={currentCart}/>
    </div>
  );
}

export default InfoPanel;
