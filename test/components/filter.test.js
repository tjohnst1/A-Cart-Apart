import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Filter } from '../src/components/filter/Filter.jsx';

function setup() {
  const props = {
    tags: ["Middle Eastern", "Noodles", "Paleo"],
    filter: {
      matches: {
        carts: [],
        tags: ["Noodles"]
      },
      searchTerms: "noodles"
    },
    handleFilterMarkers: jest.fn()
  }
  const filterElement = shallow(<Filter tags={props.tags} filter={props.filter} handleFilterMarkers={props.handleFilterMarkers} />);
  return {
    props,
    filterElement
  }
}

describe('Filter', () => {
  const filterElement = setup().filterElement;

  it('should show the provided filters', function() {
    expect(filterElement.find('.filter__input-group')).toHaveLength(3);
  });

  it('should display the active filter as checked', function() {
    expect(filterElement.find('label[htmlFor="noodles"]').contains(<div className="control-indicator active" />)).toBe(true);
  });
});
