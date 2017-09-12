import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { InfoPanel } from '../src/components/infoPanel/InfoPanel.jsx';
import { Filter } from '../src/components/filter/Filter.jsx';
import { CartInfo } from '../src/components/infoPanel/CartInfo.jsx';
import { SearchResults } from '../src/components/infoPanel/SearchResults.jsx';

describe("Info Panel", function() {
  const props = {
    currentPanel: 'filter',
    currentCart: null,
    filter: {
      matches: {
        carts: [],
        tags: []
      }
    },
    searchTerms: "",
    handleFindCart: jest.fn(),
    handleShowCartInfo: jest.fn(),
    handleShowPanel: jest.fn()
  }
  let infoPanelElement = shallow(<InfoPanel currentPanel={props.currentPanel} currentCart={props.currentCart} filter={props.filter} handleFindCart={props.handleFindCart} handleShowCartInfo={props.handleShowCartInfo} handleShowPanel={props.handleShowPanel}/>)

  it("should show the correct class names", function() {
    expect(infoPanelElement.find('.filter-panel')).toHaveLength(1);
    infoPanelElement = shallow(<InfoPanel currentPanel="cart info" currentCart={props.currentCart} filter={props.filter} handleFindCart={props.handleFindCart} handleShowCartInfo={props.handleShowCartInfo} handleShowPanel={props.handleShowPanel}/>)
    expect(infoPanelElement.find('.cart-info-panel')).toHaveLength(1);
    infoPanelElement = shallow(<InfoPanel currentPanel="search" currentCart={props.currentCart} filter={props.filter} handleFindCart={props.handleFindCart} handleShowCartInfo={props.handleShowCartInfo} handleShowPanel={props.handleShowPanel}/>)
    expect(infoPanelElement.find('.search-panel')).toHaveLength(1);
  });

});
