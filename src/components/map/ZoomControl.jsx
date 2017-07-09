import React from 'react';
import PropTypes from 'prop-types';
import './zoom.scss';
import { zoomConfig } from './mapConfig';

const ZoomControl = (props) => {
  const { mapReference, type } = props;

  const zoom = () => {
    const currentZoom = mapReference.getZoom();
    if (type === 'increase') {
      mapReference.setZoom(currentZoom + zoomConfig.increment);
    } else {
      mapReference.setZoom(currentZoom - zoomConfig.increment);
    }
  }

  if (type === 'increase') {
    return (
      <button className="zoom__btn increase" onClick={() => zoom()}>+</button>
    )
  } else {
    return (
      <button className="zoom__btn decrease" onClick={() => zoom()}>-</button>
    )
  }
}

ZoomControl.propTypes = {
  type: PropTypes.string.isRequired,
}

export default ZoomControl;
