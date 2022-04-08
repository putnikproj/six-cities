import { MutableRefObject, useEffect, useState } from 'react';
import { Map, TileLayer } from 'leaflet';

import { City } from '../types/city';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: City): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current === null || map !== null) {
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
    instance.addLayer(
      new TileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }),
    );

    setMap(instance);
  }, [city, map, mapRef]);

  return map;
}

export default useMap;
