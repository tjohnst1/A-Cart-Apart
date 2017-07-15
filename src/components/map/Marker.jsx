import React, { Component } from 'react';

export default class Marker extends Component {
  addOnClick(markerReference, mapReference, position, id, handleShowCartInfo, handleToggleFilter) {
    markerReference.addListener('click', () => {
      handleToggleFilter(false);
      handleShowCartInfo(id);
      mapReference.panTo(position);
    });
  }

  componentDidMount() {
    const { mapReference, position, id, handleShowCartInfo, handleToggleFilter } = this.props;
    const markerReference = this.props.reference;
    this.addOnClick(markerReference, mapReference, position, id, handleShowCartInfo, handleToggleFilter);
  }

  render() {
    return null;
  }
}
