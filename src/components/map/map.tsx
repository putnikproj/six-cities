import { useRef } from 'react';
import 'leaflet/dist/leaflet.css';

import { City } from '../../types/city';
import useMap from '../../hooks/useMap';

type MapProps = {
  city: City,
};

function Map({ city }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  useMap(mapRef, city);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
