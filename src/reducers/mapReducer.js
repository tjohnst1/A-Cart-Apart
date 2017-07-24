import { intersection } from 'lodash';
import { STORE_MAP_REFERENCE, STORE_MARKER_REFERENCES, FILTER_MARKERS, SHOW_PANEL, DESELECT_CURRENT_MARKER } from '../actions/map';

const initialState = {
  mapReference: null,
  markers: null,
  filter: [],
  currentPanel: null,
};

function updateFilters(newFilterItem, currentFilters) {
  const filterItemIndex = currentFilters.indexOf(newFilterItem);
  if (filterItemIndex === -1) {
    return currentFilters.concat(newFilterItem);
  }
  return currentFilters.slice(0, filterItemIndex).concat(currentFilters.slice(filterItemIndex + 1));
}

export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_MAP_REFERENCE: {
      return Object.assign({}, state, {
        mapReference: action.map,
      });
    }
    case STORE_MARKER_REFERENCES: {
      const markers = action.cartData.map((cartInfo) => {
        const position = { lat: cartInfo.location.lat, lng: cartInfo.location.lng };
        /* eslint-disable */
        const markerReference = new google.maps.Marker({
          position,
          map: state.mapReference,
          icon: {
            url: 'img/blue-pin.png',
            size: new google.maps.Size(26, 32),
            optimized: false,
          },
        });
        /* eslint-enable */
        return {
          reference: markerReference,
          position,
          id: cartInfo.id,
          tags: cartInfo.tags,
        };
      });
      return Object.assign({}, state, {
        markers,
      });
    }
    case DESELECT_CURRENT_MARKER: {
      const markers = state.markers.map((marker) => {
        /* eslint-disable */
        marker.reference.setIcon({
          url: 'img/blue-pin.png',
          size: new google.maps.Size(26, 32),
          optimized: false,
        });
        /* eslint-enable */
        return marker;
      });
      return Object.assign({}, state, {
        markers,
      });
    }
    case SHOW_PANEL: {
      const panel = (action.panel !== state.currentPanel) ? action.panel : null;
      return Object.assign({}, state, {
        currentPanel: panel,
      });
    }
    case FILTER_MARKERS: {
      const newFilter = updateFilters(action.tag, state.filter);
      const markers = state.markers.map((markerObj) => {
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
      });
      return Object.assign({}, state, {
        filter: newFilter,
        markers,
      });
    }
    default:
      return state;
  }
}
