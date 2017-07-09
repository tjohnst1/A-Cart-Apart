import { intersection } from 'lodash';
import { STORE_MAP_REFERENCE, STORE_MARKER_REFERENCES, FILTER_MARKERS } from '../actions/map'

const initialState = {
  mapReference: null,
  markers: null,
  filter: [],
}

function updateFilters(newFilterItem, currentFilters) {
  const filterItemIndex = currentFilters.indexOf(newFilterItem);
  if (filterItemIndex === -1) {
    return currentFilters.concat(newFilterItem)
  }
  return currentFilters.slice(0,filterItemIndex).concat(currentFilters.slice(filterItemIndex + 1));
}

export function mapReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_MAP_REFERENCE: {
      return Object.assign({}, state, {
        mapReference: action.map,
      })
    }
    case STORE_MARKER_REFERENCES: {
      const markers = action.cartData.map(cartInfo => {
        const position = { lat: cartInfo.location.lat, lng: cartInfo.location.lng };
        const markerReference = new google.maps.Marker({
          position,
          map: state.mapReference,
        });
        return {
          reference: markerReference,
          position,
          id: cartInfo.id,
          tags: cartInfo.tags,
        }
      });
      return Object.assign({}, state, {
        markers
      });
    }
    case FILTER_MARKERS: {
      const newFilter = updateFilters(action.tag, state.filter);
      const markers = state.markers.map(markerObj => {
        // show all if there are no filter items
        if (newFilter.length === 0) {
          markerObj.reference.setMap(state.mapReference);
          return markerObj;
        }

        if (intersection(markerObj.tags, newFilter).length > 0) {
          markerObj.reference.setMap(state.mapReference);
        } else {
          markerObj.reference.setMap(null);
        }
        return markerObj;
      })
      return Object.assign({}, state, {
        filter: newFilter,
        markers
      })
    }
    default:
      return state;
  }
}
