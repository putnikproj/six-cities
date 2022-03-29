import { useEffect, useRef } from 'react';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { City } from '../../types/city';
import useMap from '../../hooks/useMap';
import { PointerImage } from '../../const';
import { Offers } from '../../types/offer';

const defaultPointerIcon = new Icon({
  iconUrl: PointerImage.DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

type MapProps = {
  city: City,
  offers: Offers,
};

function Map({ city, offers }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (!map) {
      return;
    }

    offers.forEach((offer) => {
      new Marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude,
      })
        .setIcon(defaultPointerIcon)
        .addTo(map);
    });
  }, [map, offers]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
