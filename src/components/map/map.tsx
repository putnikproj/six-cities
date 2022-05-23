import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMap } from '../../hooks';
import { Point, Offer, Location } from '../../types';
import {
  Marker,
  MarkerType,
  createMapMarker,
  removeMapMarker,
  setMapMarkerType,
} from '../../helpers/map-manager';

type MapProps = {
  location: Location;
  points: Point[];
  activePoint?: Point;
};

// Component
function Map({ location, points, activePoint }: MapProps): JSX.Element {
  // Map references
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);
  // Map markers. Needs in the second effect, that changes marker's 'activePointerIcon'
  const [mapMarkers, setMapMarkers] = useState<Marker[]>([]);

  // Merges points and activePoint in one array if needed
  const shouldAddActivePoint = activePoint && !points.find((point) => point.id === activePoint.id);
  const allPoints = useMemo(
    () => (shouldAddActivePoint ? [...points, activePoint] : points),
    [activePoint, points, shouldAddActivePoint],
  );

  // Finds out if points prop has changed or not to understand should rerender mapPoints or not
  const [prevPointsIds, setPrevPointsIds] = useState<Offer['id'][] | undefined>();
  const pointsIds = allPoints.map((point) => point.id);
  const havePointsPropChanged = !(
    prevPointsIds &&
    allPoints.length === prevPointsIds.length &&
    allPoints.every((point) => prevPointsIds.includes(point.id))
  );

  const getMarkerTypeById = useCallback(
    (id: Offer['id']) => (activePoint?.id === id ? MarkerType.ACTIVE : MarkerType.DEFAULT),
    [activePoint],
  );

  //* Effects
  // Effect that renders markers on the map ONLY when points prop changes or mapRef created
  useEffect(() => {
    if (!map || !havePointsPropChanged) {
      return;
    }
    setPrevPointsIds(pointsIds);

    // Creates new markers and adds them to map and to state (for further second effect)
    const curMarkers: Marker[] = [];
    allPoints.forEach((point) => {
      const marker = createMapMarker(point, getMarkerTypeById(point.id), map);
      curMarkers.push(marker);
    });
    setMapMarkers(curMarkers);

    // Cleans mapMarkers for the new one (if needed)
    return () => {
      if (!havePointsPropChanged || !prevPointsIds) {
        return;
      }

      mapMarkers.forEach((marker) => removeMapMarker(marker, map));
    };
  }, [
    map,
    havePointsPropChanged,
    pointsIds,
    prevPointsIds,
    mapMarkers,
    allPoints,
    getMarkerTypeById,
  ]);

  // Effect that changes point's 'activeMarkerIcon', if 'activeOffer' state changes
  useEffect(() => {
    mapMarkers.forEach((marker) => setMapMarkerType(marker, getMarkerTypeById(marker.id)));
  }, [getMarkerTypeById, mapMarkers]);

  return <div style={{ height: '100%' }} ref={mapRef}></div>;
}

export default Map;
