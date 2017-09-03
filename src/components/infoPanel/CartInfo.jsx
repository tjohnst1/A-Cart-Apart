import React from 'react';
import PropTypes from 'prop-types';
import './cartInfo.scss';

const CartInfo = (params) => {
  const { currentCart } = params;

  if (currentCart) {
    const { name, location, tags, phoneNumber, hours, facebook, twitter, website } = currentCart;

    return (
      <div className="cart-info">
        <h2 className="cart-info__headline">{name}</h2>
        <p className="cart-info__secondary">{location.address}</p>
        <p className="cart-info__body-text"><i>Tags:</i> {tags.join(', ')}</p>
        {phoneNumber ? <p className="cart-info__body-text"><i>Phone Number:</i> <a href={phoneNumber}>{phoneNumber}</a></p> : null}
        {facebook ? <p className="cart-info__body-text"><i>Facebook:</i> <a href={facebook}>{facebook}</a></p> : null}
        {twitter ? <p className="cart-info__body-text"><i>Twitter:</i> <a href={twitter}>{twitter}</a></p> : null}
        {website ? <p className="cart-info__body-text"><i>Website:</i> <a href={website}>{website}</a></p> : null}
        <table className="cart-info__hours">
          <tbody>
            <tr>
              <td>Monday:</td>
              <td>{hours.monday || 'Closed'}</td>
            </tr>
            <tr>
              <td>Tuesday:</td>
              <td>{hours.tuesday || 'Closed'}</td>
            </tr>
            <tr>
              <td>Wednesday:</td>
              <td>{hours.wednesday || 'Closed'}</td>
            </tr>
            <tr>
              <td>Thursday:</td>
              <td>{hours.thursday || 'Closed'}</td>
            </tr>
            <tr>
              <td>Friday:</td>
              <td>{hours.friday || 'Closed'}</td>
            </tr>
            <tr>
              <td>Saturday:</td>
              <td>{hours.saturday || 'Closed'}</td>
            </tr>
            <tr>
              <td>Sunday:</td>
              <td>{hours.sunday || 'Closed' }</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return null;
};

export default CartInfo;

CartInfo.propTypes = {
  currentCart: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      address: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    phoneNumber: PropTypes.string,
    hours: PropTypes.object.isRequired,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    website: PropTypes.string.isRequired,
  }),
};

CartInfo.defaultProps = {
  currentCart: null,
};
