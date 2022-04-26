import { useEffect } from 'react';
import classNames from 'classnames';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { setActiveCity, setActiveOffer, setCityOffers } from '../../store/action';
import { CityName } from '../../helpers/enum';
import { offers as offersMoks } from '../../mocks/offers';

import Header from '../../components/header';
import CitiesTabs from '../../components/cities-tabs';
import Cities from '../../components/cities';

function Main(): JSX.Element {
  const offers = useTypedSelector((state) => state.offers);
  const activeCity = useTypedSelector((state) => state.activeCity);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    //TODO. For now the logic of gettin cities in accordance to active city will be there
    const cityOffers = offersMoks.filter((offer) => offer.city.name === activeCity);
    dispatch(setCityOffers(cityOffers));
    dispatch(setActiveOffer(null));
  }, [activeCity, dispatch]);

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
        <Cities activeCity={activeCity} offers={offers} />
      </main>
    </div>
  );
}

export default Main;
