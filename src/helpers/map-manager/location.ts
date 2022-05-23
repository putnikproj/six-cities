import { Location } from '../../types';
import { MapInstance } from './instance';

export function isSameLocation(firstLoc: Location, secondLoc: Location) {
  return (
    firstLoc.latitude === secondLoc.latitude &&
    firstLoc.longitude === secondLoc.longitude &&
    firstLoc.zoom === secondLoc.zoom
  );
}

export function changeMapLocation(map: MapInstance, location: Location) {
  map.flyTo({ lat: location.latitude, lng: location.longitude }, location.zoom, {
    duration: 3.5,
  });
}
