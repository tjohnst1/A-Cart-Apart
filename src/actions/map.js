export const STORE_MAP_REFERENCE = 'STORE_MAP_REFERENCE';
export const STORE_MARKER_REFERENCES = 'STORE_MARKER_REFERENCES';
export const FILTER_MARKERS = 'FILTER_MARKERS';
export const DESELECT_CURRENT_MARKER = 'DESELECT_CURRENT_MARKER';
export const SHOW_PANEL = 'SHOW_PANEL';
export const SELECT_MARKER = 'SELECT_MARKER';

export function storeMapReference(map) {
  return {
    type: STORE_MAP_REFERENCE,
    map,
  };
}

export function initializeMarkers(cartData) {
  return {
    type: STORE_MARKER_REFERENCES,
    cartData,
  };
}

export function filterMarkers(phrase, filterType = null) {
  return {
    type: FILTER_MARKERS,
    phrase,
    filterType,
  };
}

export function showPanel(panel) {
  return {
    type: SHOW_PANEL,
    panel,
  };
}

export function deselectCurrentMarker() {
  return {
    type: DESELECT_CURRENT_MARKER,
  };
}

export function selectMarker(id) {
  return {
    type: SELECT_MARKER,
    id,
  };
}
