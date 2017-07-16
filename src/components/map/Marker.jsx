import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Marker extends Component {
  addOnClick(props) {
    const { mapReference, position, id, handleShowCartInfo, handleToggleFilter } = props;
    const markerReference = props.reference;
    markerReference.addListener('click', () => {
      handleToggleFilter(false);
      handleShowCartInfo(id);
      markerReference.setIcon({
        url: 'img/orange-pin.png',
        size: new google.maps.Size(26, 32),
        optimized: false,
      })
      mapReference.panTo(position);
    });
  }

  componentDidMount() {
    this.addOnClick(this.props);
  }

  render() {
    return null;
  }
}

Marker.propTypes = {
  mapReference: PropTypes.object.isRequired,
  position: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  handleShowCartInfo: PropTypes.func.isRequired,
  handleToggleFilter: PropTypes.func.isRequired,
}
