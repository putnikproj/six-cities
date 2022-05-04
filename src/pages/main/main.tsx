import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import classNames from 'classnames';

import { useTypedSelector, useTypedDispatch } from '../../hooks';
import {
  setActiveCity,
  loadAllOffers,
  offersSelector,
  activeCitySelector,
} from '../../store/slices/offers';
import { CityName } from '../../helpers/enum';
import { handleAPIError } from '../../helpers/api';

import Header from '../../components/header';
import Cities from '../../components/cities';
import CitiesTabs from '../../components/cities-tabs';

function Main(): JSX.Element {
  const [loadError, setLoadError] = useState<AxiosError | undefined>(undefined);

  const offers = useTypedSelector(offersSelector);
  const activeCity = useTypedSelector(activeCitySelector);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    const loadOffers = async () => {
      try {
        await dispatch(loadAllOffers());
      } catch (err) {
        handleAPIError(err, (error) => setLoadError(error));
      }
    };

    if (!offers) {
      loadOffers();
    }
  }, [dispatch, offers]);

  const handleCityChange = (newActiveCity: CityName) => {
    dispatch(setActiveCity(newActiveCity));
  };

  return (
    <div className="page page--gray page--main">
      <Header />

      <main
        className={classNames('page__main', 'page__main--index', {
          'page__main--index-empty': !offers || offers.length === 0,
        })}
      >
        <CitiesTabs activeCity={activeCity} onCityChange={handleCityChange} />
        <Cities
          activeCity={activeCity}
          offers={offers ? offers.filter((offer) => offer.city.name === activeCity) : null}
          error={loadError}
        />
      </main>
    </div>
  );
}

export default Main;
