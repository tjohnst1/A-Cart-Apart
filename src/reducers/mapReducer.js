import { intersection } from 'lodash';
import { STORE_MAP_REFERENCE, STORE_MARKER_REFERENCES, FILTER_MARKERS, SHOW_PANEL, DESELECT_CURRENT_MARKER, SELECT_MARKER } from '../actions/map';

const initialState = {
  mapReference: null,
  markers: null,
  filter: {
    searchTerms: '',
    matches: {
      tags: [],
      names: [],
    },
  },
  currentPanel: null,
};

function updateMarkers(mapReference, markers, filter, filterType) {
  switch (filterType) {
    case 'search': {
      // if there are no search terms, show all the markers
      if (filter.seachTerms === '') {
        return markers.map((marker) => {
          marker.reference.setMap(mapReference);
          return marker;
        });
      }

      const re = new RegExp(filter.searchTerms, 'gi');
      return markers.map((marker) => {
        // check to see if the marker name or tags at least partially match the search terms
        if (re.test(marker.name) || re.test(marker.tags.join(''))) {
          marker.reference.setMap(mapReference);
        } else {
          marker.reference.setMap(null);
        }

        return marker;
      });
    }
    case 'tags': {
      // if there are no search tags, show all the markers
      if (filter.matches.tags.length === 0) {
        return markers.map((marker) => {
          marker.reference.setMap(mapReference);
          return marker;
        });
      }

      return markers.map((marker) => {
        // check if the marker has some of the tags we are looking for
        if (intersection(marker.tags, filter.matches.tags).length > 0) {
          marker.reference.setMap(mapReference);
        } else {
          marker.reference.setMap(null);
        }
        return marker;
      });
    }
    default:
      return markers;
  }
}

function updateMatches(markers, searchTerms) {
  const newMatches = {
    names: [],
    tags: [],
  };

  const re = new RegExp(searchTerms, 'gi');

  markers.forEach((marker) => {
    // push up the matched tags
    marker.tags.forEach((tag) => {
      if (re.test(tag) && (newMatches.tags.indexOf(tag) === -1)) {
        newMatches.tags.push(tag);
      }
    });

    // push up the matched names
    if (re.test(marker.name)) {
      newMatches.names.push(marker.name);
    }
  });

  return newMatches;
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
          name: cartInfo.name,
        };
      });
      return Object.assign({}, state, {
        markers,
      });
    }
    case SELECT_MARKER: {
      state.markers.map((marker) => {
        if (marker.id === action.id) {
          /* eslint-disable */
          marker.reference.setIcon({
            url: 'img/orange-pin.png',
            size: new google.maps.Size(26, 32),
            optimized: false,
          });
          /* eslint-enable */
        }
        return marker;
      });
      return Object.assign({}, state, {
        state,
      });
    }
    case DESELECT_CURRENT_MARKER: {
      state.markers.forEach((marker) => {
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
        state,
      });
    }
    case SHOW_PANEL: {
      // set the panel, but don't do anything if it is currently selected
      const currentPanel = action.panel !== state.currentPanel ? action.panel : null;
      return Object.assign({}, state, {
        currentPanel,
      });
    }
    case FILTER_MARKERS: {
      const { phrase, filterType } = action;
      const { matches } = state.filter;
      const { markers, mapReference } = state;
      const newFilter = {
        matches: {
          tags: [],
          names: [],
        },
        searchTerms: '',
      };

      let newMarkers = [];

      switch (filterType) {
        case 'search':
          newFilter.searchTerms = phrase;
          newFilter.matches = updateMatches(markers, phrase);
          newMarkers = updateMarkers(mapReference, markers, newFilter, filterType);
          break;
        case 'tags':
          // check if there are already tags being searched for
          if (matches.tags.length > 0) {
            // remove the search term if it was present in the previous state
            if (matches.tags.indexOf(phrase) !== -1) {
              newFilter.matches.tags = matches.tags.filter(tag => tag !== phrase);
            } else {
            // otherwise, add the new search term to the filter
              newFilter.matches.tags = matches.tags.concat(phrase);
            }
          } else {
            // assign the tags if there weren't any declaired in the previous state
            newFilter.matches.tags = [phrase];
          }
          newMarkers = updateMarkers(mapReference, markers, newFilter, filterType);
          break;
        default:
          newMarkers = markers;
      }

      return Object.assign({}, state, {
        filter: newFilter,
        markers: newMarkers,
      });
    }

    default:
      return state;
  }
}
