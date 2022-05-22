import { LoadingStatus } from '../../helpers/enum';
import { useTypedSelector } from '../../hooks';
import {
  activeCitySelector,
  offersLoadingErrorSelector,
  sortedActiveCityOffersSelector,
} from '../../store/slices/offers';

import Spinner from '../spinner';
import CityPlacesEmpty from './city-places-empty';
import CityPlaceList from '../city-places-list';
import CityMap from '../city-map';

type CityPlacesProps = {
  loadingStatus: LoadingStatus;
};

function CityPlaces({ loadingStatus }: CityPlacesProps) {
  const error = useTypedSelector(offersLoadingErrorSelector);
  const offers = useTypedSelector(sortedActiveCityOffersSelector);
  const activeCity = useTypedSelector(activeCitySelector);

  function getContent() {
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
      return <CityPlacesEmpty activeCity={activeCity} />;
    }

    return (
      <div className="cities__places-container container">
        {/* left section */}
        <CityPlaceList offers={offers} activeCity={activeCity} />

        {/* right section */}
        <CityMap offers={offers} />
      </div>
    );
  }

  return <div className="cities">{getContent()}</div>;
}

export default CityPlaces;
