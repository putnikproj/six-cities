import { useEffect, useState } from 'react';
import { usePrevious } from '.';
import {
  addMarkerToMap,
  createMarker,
  MapInstance,
  Marker,
  MarkerType,
  removeMarkerFromMap,
  setMarkerType,
} from '../helpers/map-manager';
import { Point } from '../types';

/** Merges points and activePoint in one array if needed */
const mergePoints = (points: Point[], activePoint: Point | undefined) => {
  const shouldAddActivePoint = activePoint && !points.find((point) => point.id === activePoint.id);
  return shouldAddActivePoint ? [...points, activePoint] : points;
};

export const useMapMarkers = (
  points: Point[],
  activePoint: Point | undefined,
  map: MapInstance | null,
) => {
  const newPoints = mergePoints(points, activePoint);
  const prevPoints = usePrevious(map ? newPoints : undefined);

  const prevActivePoint = usePrevious(activePoint);

  const [markersOnMap] = useState(new Map<Point['id'], Marker>());

  useEffect(() => {
    if (!map) {
      return;
    }

    // Sets active marker if points are the same
    const pointsNotChanged =
      prevPoints &&
      newPoints.length === prevPoints.length &&
      newPoints.every((point) => prevPoints.includes(point));

    if (pointsNotChanged) {
      const activeMarker = activePoint && markersOnMap.get(activePoint.id);
      const prevActiveMarker = prevActivePoint && markersOnMap.get(prevActivePoint.id);

      setMarkerType(prevActiveMarker, MarkerType.DEFAULT);
      setMarkerType(activeMarker, MarkerType.ACTIVE);
      return;
    }

    // If points changed then clean current markers and create the new ones
    markersOnMap.forEach((marker) => removeMarkerFromMap(marker, map));
    markersOnMap.clear();

    newPoints.forEach((point) => {
      const newMarker = createMarker(point);
      if (point.id === activePoint?.id) {
        setMarkerType(newMarker, MarkerType.ACTIVE);
      }
      addMarkerToMap(newMarker, map);
      markersOnMap.set(point.id, newMarker);
    });
  }, [map, markersOnMap, activePoint, prevActivePoint, prevPoints, newPoints]);

  return markersOnMap;
};
