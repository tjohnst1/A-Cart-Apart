import React from 'react';
import PropTypes from 'prop-types';
import { zoomConfig } from './mapConfig';

const ZoomControl = (props) => {
  zoom() {
    const currentZoom = map.getZoom();
    if (props.type === 'increase') {
      props.map.setZoom(currentZoom + zoomConfig.increment);
    } else {
      props.map.setZoom(currentZoom - zoomConfig.increment);
    }
  }

  if (type === 'increase') {
    return (
      <button onClick={() => zoom()}>+</button>
    )
  } else {
    return (
      <button onClick={() => zoom()}>-</button>
    )
  }
}

ZoomControl.propTypes = {
  type: PropTypes.string.isRequired,
}
