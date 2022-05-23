import { Map as LeafletMap, TileLayer } from 'leaflet';

import { Location } from '../../types';

export type MapInstance = LeafletMap;

const LAYER_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const ATTRIBUTION = `&copy;
  <a href="https://www.openstreetmap.org/copyright">
    OpenStreetMap
  </a> contributors &copy;
  <a href="https://carto.com/attributions">CARTO</a>`;

export function createMap(
  element: HTMLElement,
  options: {
    location: Location;
  },
): MapInstance {
  const map = new LeafletMap(element, {
    center: {
      lat: options.location.latitude,
      lng: options.location.longitude,
    },
    zoom: options.location.zoom,
  });

  map.addLayer(new TileLayer(LAYER_URL, { attribution: ATTRIBUTION }));

  return map;
}
