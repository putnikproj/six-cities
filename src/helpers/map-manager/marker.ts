import { Icon, Marker as LeafletMarker } from 'leaflet';

import { Offer, Point } from '../../types';
import { MapInstance } from './instance';

export type Marker = {
  instance: LeafletMarker<object>;
  id: Offer['id'];
};

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

  return { instance: marker, id: point.id };
}

export function setMarkerType(marker: Marker, type: MarkerType) {
  marker.instance.getElement()?.setAttribute('src', getMarkerIconFromType(type).options.iconUrl);
}

export function addMarkersToMap(markers: Marker[], map: MapInstance) {
  markers.forEach((marker) => marker.instance.addTo(map));
}

export function removeMarkersFromMap(markers: Marker[], map: MapInstance) {
  markers.forEach((marker) => marker.instance.removeFrom(map));
}
