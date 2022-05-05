import { useEffect } from 'react';
import classNames from 'classnames';

import { useTypedSelector, useTypedDispatch } from '../../hooks';
import {
  areZeroOffersSelector,
  loadAllOffers,
  offersLoadingStatusSelector,
} from '../../store/slices/offers';
import { LoadingStatus } from '../../helpers/enum';

import Header from '../../components/header';
import CityPlaces from '../../components/city-places';
import CitiesTabs from '../../components/cities-tabs';

function Main(): JSX.Element {
  const areZeroOffers = useTypedSelector(areZeroOffersSelector);
  const loadingStatus = useTypedSelector(offersLoadingStatusSelector);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (loadingStatus === LoadingStatus.IDLE) {
      dispatch(loadAllOffers());
    }
  }, [dispatch, loadingStatus]);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main
        className={classNames('page__main', 'page__main--index', {
          'page__main--index-empty': areZeroOffers,
        })}
      >
        <CitiesTabs />
        <CityPlaces loadingStatus={loadingStatus} />
      </main>
    </div>
  );
}

export default Main;
