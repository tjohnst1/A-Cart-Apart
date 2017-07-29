import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Marker extends Component {
  constructor() {
    super();
    this.addOnClick = (props) => {
      const { mapReference, position, id, handleShowCartInfo } = props;
      const markerReference = props.reference;
      markerReference.addListener('click', () => {
        handleShowCartInfo(id);
        mapReference.panTo(position);
      });
    };
  }

  componentDidMount() {
    this.addOnClick(this.props);
  }

  render() {
    return null;
  }
}

Marker.propTypes = {
  mapReference: PropTypes.object.isRequired,
  reference: PropTypes.object.isRequired,
  position: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  handleShowCartInfo: PropTypes.func.isRequired,
};
