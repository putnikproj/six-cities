import { SyntheticEvent, useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import classNames from 'classnames';

import { CityName } from '../../const';
import { State } from '../../types/state';
import { ActionsType, addCityOffers, changeCity } from '../../store/action';
import { offers } from '../../mocks/offers';

function mapStateToProps(state: State) {
  return {
    activeCity: state.activeCity,
  };
}

function mapDispatchToProps(dispatch: Dispatch<ActionsType>) {
  return {
    loadCities(cityOffers: State['offers']) {
      dispatch(addCityOffers(cityOffers));
    },
    changeActiveCity(cityName: State['activeCity']) {
      dispatch(changeCity(cityName));
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function CitiesTabs({ activeCity, changeActiveCity, loadCities }: PropsFromRedux) {
  useEffect(() => {
    loadCities(offers.filter((offer) => offer.city.name === activeCity));
  }, [activeCity, loadCities]);

  const handleLinkClick = (city: State['activeCity']) => (evt: SyntheticEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    changeActiveCity(city);
  };

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">

            {Object.values(CityName).map((city) => (
              <li key={city} className="locations__item">
                <a
                  onClick={handleLinkClick(city)}
                  className={classNames(
                    'locations__item-link',
                    'tabs__item',
                    { 'tabs__item--active': activeCity === city },
                  )}
                  href="/"
                >
                  <span>{city}</span>
                </a>
              </li>
            ))}

          </ul>
        </section>
      </div>
    </>
  );
}

export default connector(CitiesTabs);
