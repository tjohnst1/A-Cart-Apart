import { SHOW_CART_INFO, RECEIVE_CART_DATA } from '../actions/carts';

const initialState = {
  cartData: [],
  currentCart: null,
}

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CART_DATA:
      return Object.assign({}, state, {
        cartData: action.cartData,
      })
    case SHOW_CART_INFO:
      const selectedCart = state.cartData.find((cartInfo) => {
        return cartInfo.id === action.id;
      }) || null;
      return Object.assign({}, state, {
        currentCart: selectedCart
      });
    default:
      return state;
  }
}
