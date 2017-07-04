import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from '../components/map/Map';
import { getCartDataIfNeeded } from '../actions/carts'

class Index extends Component {
  componentWillMount() {
    this.props.dispatch(getCartDataIfNeeded());
  }

  render() {
    return (
      <main>
        <Map />
      </main>
    )
  }
};

const mapStateToProps = (state) => {
  const { carts } = state;
  return {
    carts
  }
}

export default connect(mapStateToProps)(Index)
