import React, { Component } from 'react';
import './map.scss';
const $script =  require('scriptjs');
import { mapConfig } from './mapConfig';
import ZoomControl from './ZoomControl';
import InfoPanel from '../infoPanel/InfoPanel';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      map: null,
      markersPlaced: false,
    }
  }

  initMap() {
    var map = new google.maps.Map(this.el, mapConfig);
    this.setState({map: map});
  }

  componentDidMount() {
    // load google maps script
    $script(`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_KEY}`, () => {
      this.setState({
        loading: false,
      });
      this.initMap();
    });
  }

  componentDidUpdate() {
    if ((this.props.cartData.length > 0) && !this.state.markersPlaced) {
      this.props.cartData.forEach((cartData) => {
        var markerPos = {lat: cartData.location.lat, lng: cartData.location.lng};
        var marker = new google.maps.Marker({
          position: markerPos,
          map: this.state.map,
        });
        marker.addListener('click', () => {
          this.props.handleShowCartInfo(cartData.id);
          this.state.map.panTo(markerPos);
        });
      });
      this.setState({markersPlaced: true});
    }
  }

  render() {
    const { currentCart } = this.props;
    if (this.state.loading) {
      return (
        <div>loading</div>
      );
    } else {
      return (
        <div className="map__container">
          <div className='map' ref={el => this.el = el} />
          <InfoPanel currentCart={currentCart} />
          <div className="zoom__container">
            <ZoomControl type="increase" map={this.state.map} />
            <ZoomControl type="decrease" map={this.state.map} />
          </div>
        </div>
      );
    }
  }
}

export default Map;
