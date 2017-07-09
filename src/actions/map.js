export const STORE_MAP_REFERENCE = 'STORE_MAP_REFERENCE';
export const STORE_MARKER_REFERENCES = 'STORE_MARKER_REFERENCES';

export function storeMapReference(map) {
  return {
    type: STORE_MAP_REFERENCE,
    map,
  }
}

export function storeMarkerReferences(cartData) {
  return {
    type: STORE_MARKER_REFERENCES,
    cartData,
  }
}
