import { combineReducers } from 'react-redux';
import { cartReducer } from './cartReducer';
import { mapReducer } from './mapReducer';

const rootReducer = combineReducers({
  cartData: cartReducer,
  map: mapReducer,
});

export default rootReducer;
