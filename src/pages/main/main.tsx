import { useEffect } from 'react';
import classNames from 'classnames';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { setActiveCity, setActiveOffer } from '../../store/action';
import { CityName } from '../../helpers/enum';
import { loadOffers } from '../../store/api-actions';

import Header from '../../components/header';
import CitiesTabs from '../../components/cities-tabs';
import Cities from '../../components/cities';

function Main(): JSX.Element {
  const offers = useTypedSelector((state) => state.offers);
  const activeCity = useTypedSelector((state) => state.activeCity);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(setActiveOffer(null));
    dispatch(loadOffers());
  }, [dispatch]);

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
