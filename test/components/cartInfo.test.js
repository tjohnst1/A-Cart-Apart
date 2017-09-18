import React from 'react';
import { shallow, mount, render } from 'enzyme';
import CartInfo from '../../src/components/infoPanel/CartInfo.jsx';

function setup() {
  const props = {
    currentCart: {
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
    }
  }
  const cartInfoElement = shallow(<CartInfo currentCart={props.currentCart} />);
  return {
    props,
    cartInfoElement
  }
}

describe('cartInfo', () => {
  const cartInfoElement = setup().cartInfoElement;

  it('should display the cart name, address, and relevant tags', () => {
    expect(cartInfoElement.contains(<h2 className="cart-info__headline">O-Bros Osteria</h2>)).toBe(true);
    expect(cartInfoElement.contains(<p className="cart-info__secondary">590 SW 10th Ave, Portland, OR 97205, USA</p>)).toBe(true);
    expect(cartInfoElement.contains(<p className="cart-info__body-text"><i>Tags:</i> Italian, Salads, Sandwiches, Soup</p>)).toBe(true);
  })

  it("should not display the phone number, facebook, twitter, and website fields if the values are null", function() {
    expect(cartInfoElement.find('.cart-info__body-text')).toHaveLength(1);
  });

  it("should display the cart schedule", function() {
    expect(cartInfoElement.contains(<td>11:00 am - 3:00 pm</td>)).toBe(true);
    expect(cartInfoElement.contains(<td>Closed</td>)).toBe(true);
  });
});
