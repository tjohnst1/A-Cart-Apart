const initialState = {
  carts: [],
}

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_CART_DATA':
      return Object.assign({}, state, {
        carts: action.cartData,
      })
    default:
      return state;
  }
}
