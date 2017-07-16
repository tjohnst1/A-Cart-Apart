import React, { Component } from 'react';

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
