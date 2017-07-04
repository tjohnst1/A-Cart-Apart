import database from '../database/firebase';

const REQUEST_CART_DATA = 'REQUEST_CART_DATA';
const RECEIVE_CART_DATA = 'RECEIVE_CART_DATA';

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

function receiveCartData(data) {
  return {
    type: RECEIVE_CART_DATA,
    cartData: data,
  }
}

function requestCartData() {
  return {
    type: REQUEST_CART_DATA,
  }
}

function shouldFetchCartData(state) {
  if (state.carts) {
    return true;
  }
  return false;
}
