import React from 'react';
import './infoPanel.scss';
import CartInfo from './CartInfo'
import foodCarts from '../../data/data'

const InfoPanel = (props) => {
  return (
    <div className="info-panel">
      <h1 className="info-panel__headline">A Cart Apart</h1>
      <CartInfo data={foodCarts[0]}/>
    </div>
  );
}

export default InfoPanel;
