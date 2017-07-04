import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from '../components/map/Map';
import { getCartDataIfNeeded, showCartInfo } from '../actions/carts'

class Index extends Component {
  componentWillMount() {
    this.props.handleGetCartDataIfNeeded();
  }

  render() {
    const { cartData, currentCart } = this.props.cartData;
    const { handleShowCartInfo } = this.props;
    console.log(this.props)

    if (cartData) {
      return (
        <main>
          <Map cartData={cartData} currentCart={currentCart} handleShowCartInfo={handleShowCartInfo}/>
        </main>
      )
    } else {
      return (<main>Loading...</main>)
    }
  }
};

const mapStateToProps = (state) => {
  const { cartData, currentCart } = state;
  return {
    cartData,
    currentCart,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleShowCartInfo: (id) => {
      dispatch(showCartInfo(id));
    },
    handleGetCartDataIfNeeded: () => {
      dispatch(getCartDataIfNeeded())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
