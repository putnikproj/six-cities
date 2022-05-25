import { useEffect, useState } from 'react';
import { usePrevious } from '.';
import {
  addMarkersToMap,
  createMarker,
  MapInstance,
  Marker,
  MarkerType,
  removeMarkersFromMap,
  setMarkerType,
} from '../helpers/map-manager';
import { Point } from '../types';

/** Merges points and activePoint in one array if needed */
const mergePoints = (points: Point[], activePoint: Point | undefined) => {
  const shouldAddActivePoint = activePoint && !points.find((point) => point.id === activePoint.id);
  return shouldAddActivePoint ? [...points, activePoint] : points;
};

const getMarkerType = (markerId: Marker['id'], pointId: Point['id'] | undefined) =>
  pointId === markerId ? MarkerType.ACTIVE : MarkerType.DEFAULT;

export const useMapMarkers = (
  points: Point[],
  activePoint: Point | undefined,
  map: MapInstance | null,
) => {
  const newPoints = mergePoints(points, activePoint);
  const prevPoints = usePrevious(map ? newPoints : undefined);

  const [markersOnMap, setMarkersOnMap] = useState<Marker[]>([]);

  useEffect(() => {
    if (!map) {
      return;
    }

    const pointsNotChanged =
      prevPoints &&
      newPoints.length === prevPoints.length &&
      newPoints.every((point) => prevPoints.includes(point));

    // Sets markers type and corresponding icon
    if (pointsNotChanged) {
      markersOnMap.forEach((marker) =>
        setMarkerType(marker, getMarkerType(marker.id, activePoint?.id)),
      );
      return;
    }

    // Adds to state markers, that are already on map (for further second effect)
    const newMarkers = newPoints.map((point) => createMarker(point));
    addMarkersToMap(newMarkers, map);
    setMarkersOnMap(newMarkers);

    // Cleans mapMarkers for the new one if points changed
    return () => {
      removeMarkersFromMap(markersOnMap, map);
    };
  }, [map, activePoint, prevPoints, newPoints, markersOnMap]);

  return markersOnMap;
};
