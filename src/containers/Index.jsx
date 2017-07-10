import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from '../components/map/Map';
import { getCartDataIfNeeded, showCartInfo } from '../actions/carts'
import { storeMapReference, initializeMarkers, toggleFilter } from '../actions/map'
import SideBar from '../components/sideBar/SideBar'
import MenuBar from '../components/menubar/MenuBar'
import InfoPanel from '../components/infoPanel/InfoPanel'

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
        <div style={{width: '100%', height: '100%'}}>
          <MenuBar />
          <main>
            <InfoPanel currentCart={currentCart} />
            <SideBar handleToggleFilter={handleToggleFilter} showFilter={showFilter} currentCart={currentCart}/>
            <Map mapReference={mapReference} cartData={cartData} currentCart={currentCart} handleShowCartInfo={handleShowCartInfo} categories={categories}
              handleStoreMapReference={handleStoreMapReference} handleInitializeMarkers={handleInitializeMarkers} markerData={markers} showFilter={showFilter} handleToggleFilter={handleToggleFilter} />
          </main>
        </div>
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
