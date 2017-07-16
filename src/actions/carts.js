import database from '../database/firebase';
import { deselectCurrentMarker } from './map';
import { isObject } from 'lodash';

export const REQUEST_CART_DATA = 'REQUEST_CART_DATA';
export const RECEIVE_CART_DATA = 'RECEIVE_CART_DATA';
export const SHOW_CART_INFO = 'SHOW_CART_INFO';

export function getCartDataIfNeeded(state) {
  return (dispatch, getState) => {
    if (shouldFetchCartData(getState())) {
      dispatch(requestCartData());
      dispatch(fetchCartData());
    }
  }
}

function fetchCartData() {
  return dispatch => {
    database.ref('/').once('value', snap => {
      const carts = snap.val().foodCarts
      dispatch(receiveCartData(carts))
    })
  }
}

function receiveCartData(cartData) {
  return {
    type: RECEIVE_CART_DATA,
    cartData,
  }
}

function requestCartData() {
  return {
    type: REQUEST_CART_DATA,
  }
}

function shouldFetchCartData(state) {
  if (state.cartData) {
    return true;
  }
  return false;
}

function showCartInfo(id) {
  return {
    type: SHOW_CART_INFO,
    id
  }
}

export function displaySelectedCartInfo(id) {
  return function (dispatch, getState) {
    const currentCart = getState().cartData.currentCart;
    if (isObject(currentCart)) {
      dispatch(deselectCurrentMarker())
    }
    dispatch(showCartInfo(id))
  }
}
