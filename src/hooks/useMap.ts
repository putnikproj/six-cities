import { MutableRefObject, useEffect, useState } from 'react';
import { Map, TileLayer } from 'leaflet';

import { Location } from '../types';

const LAYER_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const ATTRIBUTION = `&copy;
  <a href="https://www.openstreetmap.org/copyright">
    OpenStreetMap
  </a> contributors &copy;
  <a href="https://carto.com/attributions">CARTO</a>`;

export function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  newLocation: Location,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const [location, setlocation] = useState(newLocation);

  // Create map, if it doesn't exist
  useEffect(() => {
    if (!mapRef.current || map) {
      return;
    }

    // Creates map
    const instance = new Map(mapRef.current, {
      center: {
        lat: location.latitude,
        lng: location.longitude,
      },
      zoom: location.zoom,
    });

    // Creates layer of map
    instance.addLayer(new TileLayer(LAYER_URL, { attribution: ATTRIBUTION }));

    setMap(instance);
  }, [location, map, mapRef]);

  // Fly to location, if it changes
  useEffect(() => {
    if (!map) {
      return;
    }

    const hasLocationChanged =
      newLocation.latitude !== location.latitude ||
      newLocation.longitude !== location.longitude ||
      newLocation.zoom !== location.zoom;

    if (!hasLocationChanged) {
      return;
    }

    setlocation(newLocation);
    map.flyTo({ lat: newLocation.latitude, lng: newLocation.longitude }, newLocation.zoom, {
      duration: 3.5,
    });
  }, [location, map, newLocation]);

  return map;
}
