import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './map.scss';
const $script =  require('scriptjs');
import { mapConfig } from './mapConfig';
import ZoomControl from './ZoomControl';
import InfoPanel from '../infoPanel/InfoPanel';
import Marker from './Marker';
import classNames from 'classnames'

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  // load google maps script & initialize the map
  componentDidMount() {
    $script(`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_KEY}`, () => {
      this.setState({
        loading: false,
      });
      var map = new google.maps.Map(this.el, mapConfig);
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

  createMarkers(markerData, mapReference, handleShowCartInfo, handleToggleFilter) {
    if (!markerData) {
      return null;
    }
    return markerData.map(markerObj => {
      const { id, reference, position } = markerObj;
      return <Marker key={id} id={id} reference={reference} mapReference={mapReference} position={position}
        handleShowCartInfo={handleShowCartInfo} handleToggleFilter={handleToggleFilter}/>;
    })
  }

  render() {
    const { cartData, mapReference, handleShowCartInfo, markerData, showFilter, handleToggleFilter } = this.props;
    const markerElements = this.createMarkers(markerData, mapReference, handleShowCartInfo, handleToggleFilter);
    if (this.state.loading) {
      return (
        <div>loading</div>
      );
    } else {
      return (
        <div className="map__container">
          <div className='map' ref={el => this.el = el} />
          <div className="zoom__container">
            <ZoomControl type="increase" mapReference={mapReference} />
            <ZoomControl type="decrease" mapReference={mapReference} />
          </div>
          { markerElements }
        </div>
      );
    }
  }
}

export default Map;

Map.PropTypes = {
  cartData: PropTypes.arrayOf(PropTypes.object).isRequired,
  mapReference: PropTypes.object,
  handleShowCartInfo: PropTypes.func.isRequired,
  markerData: PropTypes.arrayOf(PropTypes.object),
  showFilter: PropTypes.bool.isRequired,
  handleToggleFilter: PropTypes.func.isRequired,
}

Map.defaultValues = {
  mapReference: null,
  markerData: [],
}
