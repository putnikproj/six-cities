import { useEffect } from 'react';
import classNames from 'classnames';

import { useTypedSelector, useTypedDispatch } from '../../hooks';
import {
  loadAllOffers,
  offersLoadingStatusSelector,
  activeCitySelector,
  sortedActiveCityOffersSelector,
  offersLoadingErrorSelector,
} from '../../store/slices/offers';
import { LoadingStatus } from '../../helpers/enum';

import Header from '../../components/header';
import Cities from '../../components/cities';
import CitiesTabs from '../../components/cities-tabs';

function Main(): JSX.Element {
  const loadingStatus = useTypedSelector(offersLoadingStatusSelector);
  const error = useTypedSelector(offersLoadingErrorSelector);
  const offers = useTypedSelector(sortedActiveCityOffersSelector);
  const activeCity = useTypedSelector(activeCitySelector);

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
          'page__main--index-empty': offers.length === 0,
        })}
      >
        <CitiesTabs activeCity={activeCity} />
        <Cities
          activeCity={activeCity}
          offers={offers}
          loadingStatus={loadingStatus}
          error={error}
        />
      </main>
    </div>
  );
}

export default Main;
