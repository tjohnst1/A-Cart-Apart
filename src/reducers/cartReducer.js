import { flattenDeep, uniq } from 'lodash';
import { SHOW_CART_INFO, RECEIVE_CART_DATA } from '../actions/carts';

const initialState = {
  cartData: [],
  currentCart: null,
  tags: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CART_DATA: {
      let tags = action.cartData.map(cartInfo => cartInfo.tags);
      tags = uniq(flattenDeep(tags));
      return Object.assign({}, state, {
        cartData: action.cartData,
        tags,
      });
    }
    case SHOW_CART_INFO: {
      const selectedCart = state.cartData.find(cartInfo => cartInfo.id === action.id) || null;
      return Object.assign({}, state, {
        currentCart: selectedCart,
      });
    }
    default:
      return state;
  }
}
