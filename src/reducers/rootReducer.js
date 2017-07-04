import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';

const rootReducer = combineReducers({
  cartData: cartReducer,
});

export default rootReducer;
