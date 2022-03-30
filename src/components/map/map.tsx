import { useEffect, useRef } from 'react';
import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { City } from '../../types/city';
import useMap from '../../hooks/useMap';
import { PointerImage } from '../../const';
import { Point } from '../../types/point';

const defaultPointerIcon = new Icon({
  iconUrl: PointerImage.DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const activePointerIcon = new Icon({
  iconUrl: PointerImage.ACTIVE,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

type MapProps = {
  city: City,
  points: Point[],
  activePoint?: Point | undefined,
};

function Map({ city, points, activePoint }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  // Hook which renders markers on the map
  useEffect(() => {
    if (!map) {
      return;
    }

    // Save markers in array to clean them if rerender needed
    const markers: Marker<object>[] = [];
    const allPoints = activePoint ? [activePoint, ...points] : points;

    allPoints.forEach((point) => {
      const isActive = activePoint && activePoint.id === point.id;

      const marker = new Marker<object>({
        lat: point.latitude,
        lng: point.longitude,
      });

      marker
        .setIcon(isActive ? activePointerIcon : defaultPointerIcon)
        .addTo(map);

      markers.push(marker);
    });

    // Clean markers for the new one
    return () => {
      markers.forEach((marker) => {
        marker.removeFrom(map);
      });
    };
  }, [points, activePoint, map]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
