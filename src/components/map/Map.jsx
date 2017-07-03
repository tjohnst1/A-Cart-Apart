import React, { Component } from 'react';
import './map.scss';
const $script =  require('scriptjs');
import { mapConfig } from './mapConfig';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  initMap() {
    const map = new google.maps.Map(this.el, mapConfig);
  }

  componentWillMount() {
    // load google maps script
    $script(`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_API}`, () => {
      this.setState({
        loading: false,
      });
      this.initMap();
    });
  }

  render() {
    return (
      this.state.loading ? (<div>loading</div>) : (<div className='map' ref={el => this.el = el}>map</div>)
    );
  }
}

export default Map;
