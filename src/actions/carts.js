import { isObject } from 'lodash';
import { deselectCurrentMarker, showPanel, filterMarkers, selectMarker } from './map';
import database from '../database/firebase';

export const REQUEST_CART_DATA = 'REQUEST_CART_DATA';
export const RECEIVE_CART_DATA = 'RECEIVE_CART_DATA';
export const SHOW_CART_INFO = 'SHOW_CART_INFO';

function shouldFetchCartData(state) {
  if (state.cartData) {
    return true;
  }
  return false;
}

function requestCartData() {
  return {
    type: REQUEST_CART_DATA,
  };
}

function receiveCartData(cartData) {
  return {
    type: RECEIVE_CART_DATA,
    cartData,
  };
}

function fetchCartData() {
  return (dispatch) => {
    database.ref('/').once('value', (snap) => {
      const carts = snap.val().foodCarts;
      dispatch(receiveCartData(carts));
    });
  };
}

export function getCartDataIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchCartData(getState())) {
      dispatch(requestCartData());
      dispatch(fetchCartData());
    }
  };
}

function showCartInfo(id) {
  return {
    type: SHOW_CART_INFO,
    id,
  };
}

export function displaySelectedCartInfo(id) {
  return (dispatch, getState) => {
    const { currentCart } = getState().cartData;
    const { currentPanel } = getState().map;

    if (isObject(currentCart)) {
      dispatch(deselectCurrentMarker());
    }

    if (currentCart && (currentCart.id === id)) {
      dispatch(showCartInfo(null));
      return dispatch(showPanel(null));
    }

    if (currentPanel !== 'cart info') {
      dispatch(showPanel('cart info'));
    }

    dispatch(selectMarker(id));
    return dispatch(showCartInfo(id));
  };
}

export function findCart(phrase) {
  return (dispatch, getState) => {
    const { currentPanel } = getState().map;
    if (currentPanel !== 'search') {
      dispatch(showPanel('search'));
    }
    dispatch(filterMarkers(phrase));
  };
}
