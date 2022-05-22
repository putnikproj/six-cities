import { Offer } from '../../types';
import { useTypedSelector } from '../../hooks';
import { activeCityMapPointsSelector, activeMapPointSelector } from '../../store/slices/offers';

import Map from '../map';

type CityMapProps = {
  offers: Offer[];
};

function CityMap({ offers }: CityMapProps) {
  const mapPoints = useTypedSelector(activeCityMapPointsSelector);
  const mapActivePoint = useTypedSelector(activeMapPointSelector);

  return (
    <div className="cities__right-section">
      <section className="cities__map map">
        <Map location={offers[0].city.location} points={mapPoints} activePoint={mapActivePoint} />
      </section>
    </div>
  );
}

export default CityMap;
