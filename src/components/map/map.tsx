import { useRef } from 'react';
import { useMap, useMapMarkers } from '../../hooks';
import { Point, Location } from '../../types';

type MapProps = {
  location: Location;
  points: Point[];
  activePoint?: Point;
};

// Component
function Map({ location, points, activePoint }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);
  useMapMarkers(points, activePoint, map);

  return <div style={{ height: '100%' }} ref={mapRef}></div>;
}

export default Map;
