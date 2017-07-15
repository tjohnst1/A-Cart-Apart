export const STORE_MAP_REFERENCE = 'STORE_MAP_REFERENCE';
export const STORE_MARKER_REFERENCES = 'STORE_MARKER_REFERENCES';
export const TOGGLE_FILTER = 'TOGGLE_FILTER';
export const FILTER_MARKERS = 'FILTER_MARKERS';

export function storeMapReference(map) {
  return {
    type: STORE_MAP_REFERENCE,
    map,
  }
}

export function initializeMarkers(cartData) {
  return {
    type: STORE_MARKER_REFERENCES,
    cartData,
  }
}

export function filterMarkers(tag) {
  return {
    type: FILTER_MARKERS,
    tag,
  }
}

export function toggleFilter(value) {
  return {
    type: TOGGLE_FILTER,
    value
  }
}
