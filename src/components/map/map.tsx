import { useEffect, useRef, useState } from 'react';
import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { City } from '../../types/city';
import useMap from '../../hooks/useMap';
import { PointerImage } from '../../const';
import { Point } from '../../types/point';
import { Offer } from '../../types/offer';

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

type MarkerWithId = {
  instance: Marker<object>,
  id: Offer['id'],
}

type MapProps = {
  city: City,
  points: Point[],
  activePoint?: Point | undefined,
  shouldRerenderPoints?: boolean
};

function Map({ city, points, activePoint, shouldRerenderPoints = true }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const [markers, setMarkers] = useState<MarkerWithId[]>([]);

  // Hook which renders markers on the map, when points change
  useEffect(() => {
    if (!map) {
      return;
    }

    if (markers.length !== 0 && !shouldRerenderPoints) {
      return;
    }

    // Save markers in array to clean them if rerender needed
    const curMarkers: MarkerWithId[] = [];
    const allPoints = activePoint ? [activePoint, ...points] : points;

    allPoints.forEach((point) => {
      const markerIcon = activePoint?.id === point.id ? activePointerIcon : defaultPointerIcon;

      const marker = new Marker<object>({
        lat: point.latitude,
        lng: point.longitude,
      });

      marker.setIcon(markerIcon).addTo(map);

      curMarkers.push({
        instance: marker,
        id: point.id,
      });
    });

    setMarkers(curMarkers);

    // Clean markers for the new one, if needed
    return () => {
      if (!shouldRerenderPoints) {
        return;
      }

      curMarkers.forEach((marker) => {
        marker.instance.removeFrom(map);
      });
    };
  }, [points, activePoint, map, markers.length, shouldRerenderPoints]);

  // Hook which set marker icon without deleting old markers and adding new ones
  // This prevents flickering
  useEffect(() => {
    if (shouldRerenderPoints) {
      return;
    }

    markers.forEach((marker) => {
      const markerIcon = activePoint?.id === marker.id ? activePointerIcon : defaultPointerIcon;
      marker.instance.getElement()?.setAttribute('src', markerIcon.options.iconUrl);
    });
  }, [activePoint, map, markers, shouldRerenderPoints]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
