import React, { Component } from 'react';
const $script =  require('scriptjs');

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  initMap() {
    const portland = {lat: 45.5176391, lng: -122.6683785};
    const map = new google.maps.Map(this.el, {
      zoom: 12,
      center: portland
    });
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
      this.state.loading ? (<div>loading</div>) : (<div style={{width: '400px', height: '400px', background: 'grey'}} ref={el => this.el = el}>map</div>)
    );
  }
}

export default Map;
