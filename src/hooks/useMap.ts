import { MutableRefObject, useEffect, useState } from 'react';
import { Map, TileLayer } from 'leaflet';

import { City } from '../types';

const LAYER_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const ATTRIBUTION = `&copy;
  <a href="https://www.openstreetmap.org/copyright">
    OpenStreetMap
  </a> contributors &copy;
  <a href="https://carto.com/attributions">CARTO</a>`;

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: City): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  // Create map, if it doesn't exist
  useEffect(() => {
    if (!mapRef.current || map) {
      return;
    }

    // Creates map
    const instance = new Map(mapRef.current, {
      center: {
        lat: city.location.latitude,
        lng: city.location.longitude,
      },
      zoom: city.location.zoom,
    });

    // Creates layer of map
    instance.addLayer(new TileLayer(LAYER_URL, { attribution: ATTRIBUTION }));

    setMap(instance);
  }, [city, map, mapRef]);

  // Fly to city, if it changes
  useEffect(() => {
    if (!map) {
      return;
    }

    if (
      map.getCenter().lat === city.location.latitude &&
      map.getCenter().lng === city.location.longitude
    ) {
      return;
    }

    map.flyTo({ lat: city.location.latitude, lng: city.location.longitude }, city.location.zoom, {
      duration: 3.5,
    });
  }, [city, map]);

  return map;
}

export default useMap;
