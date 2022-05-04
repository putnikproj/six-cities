import { CityName, LoadingStatus } from '../../helpers/enum';
import { Offer } from '../../types';
import { offerToPoint } from '../../helpers/util';

import Map from '../map';
import Spinner from '../spinner';
import CitiesEmpty from './cities-empty';
import CitiesPlaceList from '../cities-place-list';

type CitiesProps = {
  offers: Offer[];
  activeCity: CityName;
  error?: string;
  loadingStatus?: LoadingStatus;
};

function Cities({ offers, activeCity, error, loadingStatus }: CitiesProps) {
  function getCitiesContent() {
    if (error) {
      return (
        <div className="cities__places-container cities__places-container--empty container">
          <h1>Can&apos;t load offers ({error}). Try to reload page.</h1>
        </div>
      );
    }

    if (loadingStatus === LoadingStatus.LOADING || loadingStatus === LoadingStatus.IDLE) {
      return <Spinner style={{ paddingTop: '50px' }} centerX />;
    }

    if (offers.length === 0) {
      return <CitiesEmpty activeCity={activeCity} />;
    }

    return (
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
    );
  }

  return <div className="cities">{getCitiesContent()}</div>;
}

export default Cities;
