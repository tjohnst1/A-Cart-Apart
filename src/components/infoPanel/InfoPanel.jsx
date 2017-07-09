import React from 'react';
import './infoPanel.scss';
import CartInfo from './CartInfo';
import Filter from './Filter';

const InfoPanel = (props) => {
  const { currentCart } = props;
  return (
    <div className="info-panel">
      <h1 className="info-panel__headline">A Cart Apart</h1>
      <CartInfo currentCart={currentCart}/>
      <Filter />
    </div>
  );
}

export default InfoPanel;
