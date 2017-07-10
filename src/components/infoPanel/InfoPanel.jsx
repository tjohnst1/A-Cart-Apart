import React from 'react';
import './infoPanel.scss';
import CartInfo from './CartInfo';

const InfoPanel = (props) => {
  const { currentCart, handleToggleFilter } = props;

  return (
    <div className="info-panel">
      <CartInfo currentCart={currentCart}/>
    </div>
  );
}

export default InfoPanel;
