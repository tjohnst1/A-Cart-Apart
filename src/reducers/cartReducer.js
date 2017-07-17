import { flattenDeep, uniq } from 'lodash';
import { SHOW_CART_INFO, RECEIVE_CART_DATA } from '../actions/carts';

const initialState = {
  cartData: [],
  currentCart: null,
  categories: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CART_DATA: {
      let categories = action.cartData.map(cartInfo => cartInfo.tags);
      categories = uniq(flattenDeep(categories));
      return Object.assign({}, state, {
        cartData: action.cartData,
        categories,
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
