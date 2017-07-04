import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';

const rootReducer = combineReducers({
  carts: cartReducer,
});

export default rootReducer;
