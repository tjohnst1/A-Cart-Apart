import React from 'react';
import { REQUEST_CART_DATA, RECEIVE_CART_DATA, SHOW_CART_INFO,
  shouldFetchCartData, requestCartData, receiveCartData, showCartInfo,
  displaySelectedCartInfo, findCart } from '../../src/actions/carts';
import database from '../database/firebase';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const obros = [{
  "name":"O-Bros Osteria",
  "location":{
    "address":"590 SW 10th Ave, Portland, OR 97205, USA",
    "lat":45.52070519999999,
    "lng":-122.6815463
  },
  "hours":{
    "monday":"11:00 am - 3:00 pm",
    "tuesday":"11:00 am - 3:00 pm",
    "wednesday":"11:00 am - 3:00 pm",
    "thursday":"11:00 am - 3:00 pm",
    "friday":"11:00 am - 3:00 pm",
    "saturday":null,
    "sunday":null
  },
  "tags":[
    "Italian",
    "Salads",
    "Sandwiches",
    "Soup"
  ],
  "facebook":null,
  "twitter":null,
  "website":null,
  "id":1
}];

const seedData = {
  cartData: [ obros ],
  currentCart: null,
  tags: []
};

const store = mockStore(seedData);

describe('carts actions', function() {
  it('should decide whether or not to fetch cart data', function() {
    expect(shouldFetchCartData(store.getState())).toEqual(true);
  });

  it('should request cart data', function() {
    expect(requestCartData()).toEqual({ type: REQUEST_CART_DATA });
  });

  it('should receive cart data', function() {
    expect(receiveCartData(obros)).toEqual({
      type: RECEIVE_CART_DATA,
      cartData: obros
    });
  });

  it('should return the selected cart id', function() {
    expect(showCartInfo(1)).toEqual({
      type: SHOW_CART_INFO,
      id: 1
    });
  });

})
