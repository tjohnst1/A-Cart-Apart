import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './infoPanel.scss';
import { showPanel } from '../../actions/map';
import CartInfo from './CartInfo';
import FilterIcon from '../icons/FilterIcon';
import Filter from '../filter/Filter';

const InfoPanel = (props) => {
  const { currentCart, handleShowPanel, currentPanel } = props;

  return (
    <div className="info-panel">
      <div className="info-panel__headline">
        <h1>A Cart Apart</h1>
        <button onClick={() => handleShowPanel('filter')}><FilterIcon /><span>Filter</span></button>
      </div>
      <div className="info-panel__details">
        { currentPanel === 'filter' ? <Filter /> : <CartInfo currentCart={currentCart} /> }
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentCart: state.cartData.currentCart,
    currentPanel: state.map.currentPanel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleShowPanel: (panel) => {
      dispatch(showPanel(panel));
    },
  };
};

InfoPanel.propTypes = {
  currentCart: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      address: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    phoneNumber: PropTypes.string,
    hours: PropTypes.object.isRequired,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    website: PropTypes.string.isRequired,
  }),
  handleShowPanel: PropTypes.func.isRequired,
  currentPanel: PropTypes.string,
};

InfoPanel.defaultProps = {
  currentCart: null,
  currentPanel: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoPanel);
