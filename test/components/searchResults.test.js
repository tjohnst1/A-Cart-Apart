import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { SearchResults } from '../../src/components/infoPanel/SearchResults.jsx';

function setup() {
  const props = {
    filter: {
      matches: {
        carts: [
          {
            id: 19,
            name: "Noodle House"
          }
        ],
        tags: ["Noodles"]
      },
      searchTerms: "noodle"
    },
    handleFilterMarkers: jest.fn(),
    handleShowCartInfo: jest.fn()
  }
  const searchResultsElement = shallow(<SearchResults filter={props.filter} handleFilterMarkers={props.handleFilterMarkers} handleShowCartInfo={props.handleShowCartInfo} />);
  return {
    props,
    searchResultsElement
  }
}

describe('cartInfo', () => {
  const searchResultsElement = setup().searchResultsElement;

  it('should display relevant carts and tags', function() {
    expect(searchResultsElement.find('Highlighter')).toHaveLength(2);
    expect(searchResultsElement.find('Highlighter').contains('Noodle House')).toBe(true);
    expect(searchResultsElement.find('Highlighter').contains('Noodles')).toBe(true);
  });

});
