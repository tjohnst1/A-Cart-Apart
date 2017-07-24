import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mapConfig } from './mapConfig';
import ZoomControl from './ZoomControl';
import Marker from './Marker';

import './map.scss';

const $script = require('scriptjs');

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.createMarkers = (markerData, mapReference, handleShowCartInfo) => {
      if (!markerData) {
        return null;
      }
      return markerData.map((markerObj) => {
        const { id, reference, position } = markerObj;
        return (
          <Marker
            key={id}
            id={id}
            reference={reference}
            mapReference={mapReference}
            position={position}
            handleShowCartInfo={handleShowCartInfo}
          />
        );
      });
    };
  }

  // load google maps script & initialize the map
  componentDidMount() {
    $script(`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_KEY}`, () => {
      this.setState({
        loading: false,
      });

      /* eslint-disable */
      const map = new google.maps.Map(this.el, mapConfig);

      google.maps.event.addDomListener(window, 'resize', () => {
        const center = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
      })
      /* eslint-enable */

      this.props.handleStoreMapReference(map);
    });
  }

  // initialize the markers when the map reference is available
  componentDidUpdate() {
    const { mapReference, cartData, handleInitializeMarkers, markerData } = this.props;
    if ((cartData.length > 0) && mapReference && !markerData) {
      handleInitializeMarkers(cartData);
    }
  }

  render() {
    const { mapReference, handleShowCartInfo, markerData } = this.props;
    const markerElements = this.createMarkers(markerData, mapReference, handleShowCartInfo);
    if (this.state.loading) {
      return (
        <div>loading</div>
      );
    }
    return (
      <div className="map__container">
        <div className="map" ref={(el) => { this.el = el; }} />
        <div className="zoom__container">
          <ZoomControl type="increase" mapReference={mapReference} />
          <ZoomControl type="decrease" mapReference={mapReference} />
        </div>
        { markerElements }
      </div>
    );
  }
}

Map.propTypes = {
  cartData: PropTypes.arrayOf(PropTypes.object).isRequired,
  mapReference: PropTypes.object,
  handleShowCartInfo: PropTypes.func.isRequired,
  handleStoreMapReference: PropTypes.func.isRequired,
  handleInitializeMarkers: PropTypes.func.isRequired,
  markerData: PropTypes.arrayOf(PropTypes.object),
};

Map.defaultProps = {
  mapReference: null,
  markerData: [],
};
