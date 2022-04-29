import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CityName, LoadStatus } from '../../helpers/enum';
import { Offer } from '../../types';
import { offerToPoint } from '../../helpers/util';

import CitiesPlaceList from '../cities-place-list';
import Map from '../map';
import Spinner from '../spinner';

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
    return (
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">
                We could not find any property available at the moment in {activeCity}
              </p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    );
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
