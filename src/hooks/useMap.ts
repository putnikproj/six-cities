import { MutableRefObject, useEffect, useState } from 'react';

import { Location } from '../types';
import { createMap, changeMapLocation, isSameLocation, MapInstance } from '../helpers/map-manager';

export function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  newLocation: Location,
): MapInstance | null {
  const [map, setMap] = useState<MapInstance | null>(null);
  const [location, setlocation] = useState(newLocation);

  // Create map, if it doesn't exist
  useEffect(() => {
    if (!mapRef.current || map) {
      return;
    }

    const newMap = createMap(mapRef.current, { location });
    setMap(newMap);
  }, [location, map, mapRef]);

  // Fly to location, if it changes
  useEffect(() => {
    if (!map || isSameLocation(newLocation, location)) {
      return;
    }

    setlocation(newLocation);
    changeMapLocation(map, newLocation);
  }, [location, map, newLocation]);

  return map;
}
