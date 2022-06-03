import { MutableRefObject, useLayoutEffect, useState } from 'react';

import { Location } from '../types';
import { usePrevious } from '.';
import { createMap, changeMapLocation, isSameLocation, MapInstance } from '../helpers/map-manager';

export function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  newLocation: Location,
): MapInstance | null {
  const [map, setMap] = useState<MapInstance | null>(null);
  const prevLocation = usePrevious(newLocation);

  useLayoutEffect(() => {
    if (!mapRef.current) {
      return;
    }

    // Create new map if there is none
    if (!map) {
      setMap(createMap(mapRef.current, { location: newLocation }));
      return;
    }

    // Change location of the existing map, if it needed
    if (prevLocation && !isSameLocation(newLocation, prevLocation)) {
      changeMapLocation(map, newLocation);
    }
  }, [map, mapRef, newLocation, prevLocation]);

  return map;
}
