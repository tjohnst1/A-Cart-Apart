import React, { Component } from 'react';

export default class Marker extends Component {
  addOnClick(markerReference, mapReference, position, id, handleShowCartInfo) {
    markerReference.addListener('click', () => {
      handleShowCartInfo(id);
      mapReference.panTo(position);
    });
  }

  componentDidMount() {
    const { mapReference, position, id, handleShowCartInfo } = this.props;
    const markerReference = this.props.reference;

    this.addOnClick(markerReference, mapReference, position, id, handleShowCartInfo);
  }

  render() {
    return null;
  }
}
