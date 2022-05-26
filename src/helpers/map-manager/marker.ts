import { Icon, Marker as LeafletMarker } from 'leaflet';

import { Point } from '../../types';
import { MapInstance } from './instance';

export type Marker = LeafletMarker;

export enum MarkerType {
  DEFAULT,
  ACTIVE,
}

const MarkerImage = {
  [MarkerType.DEFAULT]: 'img/pin.svg',
  [MarkerType.ACTIVE]: 'img/pin-active.svg',
} as const;

const defaultMarkerIcon = new Icon({
  iconUrl: MarkerImage[MarkerType.DEFAULT],
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const activeMarkerIcon = new Icon({
  iconUrl: MarkerImage[MarkerType.ACTIVE],
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const getMarkerIconFromType = (type: MarkerType) =>
  type === MarkerType.DEFAULT ? defaultMarkerIcon : activeMarkerIcon;

// functions

export function createMarker(point: Point): Marker {
  const marker = new LeafletMarker({
    lat: point.latitude,
    lng: point.longitude,
  });

  marker.setIcon(defaultMarkerIcon);

  return marker;
}

export function setMarkerType(marker: Marker | undefined, type: MarkerType) {
  if (!marker) {
    return;
  }

  marker.setIcon(getMarkerIconFromType(type));
}

export function addMarkerToMap(marker: Marker, map: MapInstance) {
  marker.addTo(map);
}

export function removeMarkerFromMap(marker: Marker, map: MapInstance) {
  marker.removeFrom(map);
}
