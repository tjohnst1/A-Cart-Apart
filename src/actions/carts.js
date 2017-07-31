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
    // if there is no cart data in the store, request it
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

    // if there was a cart previously selected, update the marker color to blue (from orange)
    if (isObject(currentCart)) {
      dispatch(deselectCurrentMarker());
    }

    // if the current cart is the same as the passed in arguement, deselect it and close the info panel
    if (currentCart && (currentCart.id === id)) {
      dispatch(showCartInfo(null));
      return dispatch(showPanel(null));
    }

    // if needed, open the cart info panel
    if (currentPanel !== 'cart info') {
      dispatch(showPanel('cart info'));
    }

    // make the selected marker orange and display the current cart info
    dispatch(selectMarker(id));
    return dispatch(showCartInfo(id));
  };
}

export function findCart(phrase) {
  return (dispatch, getState) => {
    const { currentPanel } = getState().map;
    // make sure the search results panel is open
    if (currentPanel !== 'search') {
      dispatch(showPanel('search'));
    }
    // if there is no search phrase, deselect the current marker and close the current panel
    if (phrase === '') {
      dispatch(deselectCurrentMarker());
      dispatch(showPanel(null));
    }
    // filter the markers via the provided phrase
    dispatch(filterMarkers(phrase, 'search'));
  };
}
