import React from 'react';
import './infoPanel.scss';
import CartInfo from './CartInfo';

const InfoPanel = (props) => {
  const { currentCart, handleToggleFilter } = props;

  if (currentCart) {
    return (
      <div className="info-panel">
        <CartInfo currentCart={currentCart}/>
      </div>
    );
  } else {
    return null;
  }
}

export default InfoPanel;
