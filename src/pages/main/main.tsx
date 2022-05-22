import { useEffect } from 'react';
import classNames from 'classnames';

import { useTypedSelector, useTypedDispatch } from '../../hooks';
import { areZeroOffersSelector, loadAllOffers } from '../../store/slices/offers';

import Header from '../../components/header';
import CityPlaces from '../../components/city-places';
import CitiesTabs from '../../components/cities-tabs';

function Main(): JSX.Element {
  const areZeroOffers = useTypedSelector(areZeroOffersSelector);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(loadAllOffers());
  }, [dispatch]);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main
        className={classNames('page__main', 'page__main--index', {
          'page__main--index-empty': areZeroOffers,
        })}
      >
        <CitiesTabs />
        <CityPlaces />
      </main>
    </div>
  );
}

export default Main;
