import { useTypedSelector } from '../../hooks';
import { CityName, LoadStatus } from '../../helpers/enum';
import { Offer } from '../../types';
import { offerToPoint } from '../../helpers/util';

import Map from '../map';
import Spinner from '../spinner';
import CitiesEmpty from './cities-empty';
import CitiesPlaceList from '../cities-place-list';

type CitiesProps = {
  offers: Offer[];
  activeCity: CityName;
};

function Cities({ offers, activeCity }: CitiesProps) {
  const loadStatus = useTypedSelector((state) => state.offersLoadStatus);

  if (loadStatus === LoadStatus.LOADING) {
    return (
      <div className="cities" style={{ paddingTop: '50px' }}>
        <Spinner centerX />
      </div>
    );
  }

  if (offers.length === 0) {
    return <CitiesEmpty activeCity={activeCity} />;
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        {/* left section */}
        <CitiesPlaceList offers={offers} activeCity={activeCity} />

        {/* right section */}
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map
              location={offers[0].city.location}
              points={offers.map((offer) => offerToPoint(offer))}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Cities;
