import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from '../components/map/Map';
import { getCartDataIfNeeded, showCartInfo } from '../actions/carts'
import { storeMapReference, initializeMarkers, toggleFilter } from '../actions/map'
import Filter from '../components/filter/Filter'

class Index extends Component {
  componentWillMount() {
    this.props.handleGetCartDataIfNeeded();
  }

  render() {
    const { cartData, currentCart, categories } = this.props.cartData;
    const { mapReference, markers, showFilter } = this.props.map;
    const { handleShowCartInfo, handleStoreMapReference, handleInitializeMarkers, handleToggleFilter } = this.props;

    if (cartData) {
      return (
        <main>
          <Map mapReference={mapReference} cartData={cartData} currentCart={currentCart} handleShowCartInfo={handleShowCartInfo} categories={categories}
            handleStoreMapReference={handleStoreMapReference} handleInitializeMarkers={handleInitializeMarkers} markerData={markers} showFilter={showFilter} handleToggleFilter={handleToggleFilter} />
          <Filter />
        </main>
      )
    } else {
      return (<main>Loading...</main>)
    }
  }
};

const mapStateToProps = (state) => {
  const { cartData, map } = state;
  return {
    cartData,
    map
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleShowCartInfo: (id) => {
      dispatch(showCartInfo(id));
    },
    handleGetCartDataIfNeeded: () => {
      dispatch(getCartDataIfNeeded());
    },
    handleStoreMapReference: (map) => {
      dispatch(storeMapReference(map));
    },
    handleInitializeMarkers: (markers) => {
      dispatch(initializeMarkers(markers));
    },
    handleToggleFilter: () => {
      dispatch(toggleFilter());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
