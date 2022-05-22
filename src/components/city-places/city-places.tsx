import { LoadingStatus } from '../../helpers/enum';
import { useTypedSelector } from '../../hooks';
import {
  activeCitySelector,
  offersLoadingErrorSelector,
  offersLoadingStatusSelector,
  sortedActiveCityOffersSelector,
} from '../../store/slices/offers';

import Spinner from '../spinner';
import CityPlacesEmpty from './city-places-empty';
import CityPlaceList from '../city-places-list';
import CityMap from '../city-map';

function CityPlaces() {
  const offers = useTypedSelector(sortedActiveCityOffersSelector);
  const loadingStatus = useTypedSelector(offersLoadingStatusSelector);
  const error = useTypedSelector(offersLoadingErrorSelector);

  const activeCity = useTypedSelector(activeCitySelector);

  function getContent() {
    if (loadingStatus === LoadingStatus.LOADING) {
      return <Spinner style={{ paddingTop: '50px' }} centerX />;
    }

    if (loadingStatus === LoadingStatus.FAILED && error) {
      return (
        <div className="cities__places-container cities__places-container--empty container">
          <h1>Can&apos;t load offers. {error.message}. Try to reload page.</h1>
        </div>
      );
    }

    if (loadingStatus === LoadingStatus.SUCCEEDED && offers.length === 0) {
      return <CityPlacesEmpty activeCity={activeCity} />;
    }

    if (loadingStatus === LoadingStatus.SUCCEEDED) {
      return (
        <div className="cities__places-container container">
          <CityPlaceList offers={offers} activeCity={activeCity} />
          <CityMap offers={offers} />
        </div>
      );
    }

    return null;
  }

  return <div className="cities">{getContent()}</div>;
}

export default CityPlaces;
