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
    }
  }

  initMap() {
    this.setState({map: new google.maps.Map(this.el, mapConfig)});
  }

  componentWillMount() {
    // load google maps script
    $script(`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_KEY}`, () => {
      this.setState({
        loading: false,
      });
      this.initMap();
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>loading</div>
      );
    } else {
      return (
        <div className="map__container">
          <div className='map' ref={el => this.el = el} />
          <InfoPanel />
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
