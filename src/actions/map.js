export const STORE_MAP_REFERENCE = 'STORE_MAP_REFERENCE';
export const STORE_MARKER_REFERENCES = 'STORE_MARKER_REFERENCES';
export const FILTER_MARKERS = 'FILTER_MARKERS';
export const DESELECT_CURRENT_MARKER = 'DESELECT_CURRENT_MARKER';
export const SHOW_PANEL = 'SHOW_PANEL';

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

export function filterMarkers(tag) {
  return {
    type: FILTER_MARKERS,
    tag,
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
