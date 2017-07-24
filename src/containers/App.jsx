import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import Index from './Index';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
};

export default App;
