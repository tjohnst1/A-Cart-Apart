import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Map from '../components/map/Map';
import { getCartDataIfNeeded, displaySelectedCartInfo } from '../actions/carts';
import { storeMapReference, initializeMarkers } from '../actions/map';
import InfoPanel from '../components/infoPanel/InfoPanel';

export class Index extends Component {
  componentWillMount() {
    this.props.handleGetCartDataIfNeeded();
  }

  render() {
    const { cartData, currentCart, tags } = this.props.cartData;
    const { mapReference, markers } = this.props.map;
    const { handleShowCartInfo, handleStoreMapReference, handleInitializeMarkers } = this.props;

    if (cartData) {
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <main>
            <InfoPanel />
            <Map
              mapReference={mapReference}
              cartData={cartData}
              currentCart={currentCart}
              handleShowCartInfo={handleShowCartInfo}
              tags={tags}
              handleStoreMapReference={handleStoreMapReference}
              handleInitializeMarkers={handleInitializeMarkers}
              markerData={markers}
            />
          </main>
        </div>
      );
    }

    return <main>Loading...</main>;
  }
}

const mapStateToProps = (state) => {
  const { cartData, map } = state;
  return {
    cartData,
    map,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleShowCartInfo: (id) => {
      dispatch(displaySelectedCartInfo(id));
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

Index.propTypes = {
  cartData: PropTypes.shape({
    cartData: PropTypes.arrayOf(PropTypes.object),
    tags: PropTypes.arrayOf(PropTypes.string),
    currentCart: PropTypes.object,
  }).isRequired,
  map: PropTypes.shape({
    mapReference: PropTypes.object,
    markers: PropTypes.arrayOf(PropTypes.object),
    filter: PropTypes.shape({
      matches: PropTypes.shape({
        tags: PropTypes.arrayOf(PropTypes.string),
        names: PropTypes.arrayOf(PropTypes.string),
      }),
      cartData: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
  handleGetCartDataIfNeeded: PropTypes.func.isRequired,
  handleShowCartInfo: PropTypes.func.isRequired,
  handleStoreMapReference: PropTypes.func.isRequired,
  handleInitializeMarkers: PropTypes.func.isRequired,
};
