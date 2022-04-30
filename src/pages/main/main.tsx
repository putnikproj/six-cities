import { useEffect } from 'react';
import classNames from 'classnames';

import { useTypedSelector, useTypedDispatch } from '../../hooks';
import { setActiveCity } from '../../store/action';
import { CityName, LoadStatus } from '../../helpers/enum';
import { loadOffers } from '../../store/api-actions';

import Header from '../../components/header';
import CitiesTabs from '../../components/cities-tabs';
import Cities from '../../components/cities';

function Main(): JSX.Element {
  const offers = useTypedSelector((state) => state.offers);
  const loadStatus = useTypedSelector((state) => state.offersLoadStatus);
  const activeCity = useTypedSelector((state) => state.activeCity);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (loadStatus === LoadStatus.UNLOADED) {
      dispatch(loadOffers());
    }
  }, [dispatch, loadStatus]);

  const handleCityChange = (newActiveCity: CityName) => {
    dispatch(setActiveCity(newActiveCity));
  };

  return (
    <div className="page page--gray page--main">
      <Header />

      <main
        className={classNames('page__main', 'page__main--index', {
          'page__main--index-empty': offers.length === 0,
        })}
      >
        <CitiesTabs activeCity={activeCity} onCityChange={handleCityChange} />
        <Cities
          activeCity={activeCity}
          offers={offers.filter((offer) => offer.city.name === activeCity)}
        />
      </main>
    </div>
  );
}

export default Main;
