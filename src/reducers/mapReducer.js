import { STORE_MAP_REFERENCE, STORE_MARKER_REFERENCES } from '../actions/map'

const initialState = {
  mapReference: null,
  markers: null,
}

export function mapReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_MAP_REFERENCE:
      return Object.assign({}, state, {
        mapReference: action.map,
      })
    case STORE_MARKER_REFERENCES:
      const markers = action.cartData.map(cartInfo => {
        const position = { lat: cartInfo.location.lat, lng: cartInfo.location.lng };
        const markerReference = new google.maps.Marker({
          position,
          map: state.mapReference,
        });
        return {
          reference: markerReference,
          position,
          id: cartInfo.id
        }
      });
      return Object.assign({}, state, {
        markers
      });
    default:
      return state;
  }
}
