import { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import classNames from 'classnames';

import { State } from '../../types/state';
import { ActionsType, setActiveCity, setActiveOffer, setCityOffers } from '../../store/action';
import { ActiveCity } from '../../types/city';
import { offers as offersMoks } from '../../mocks/offers';

import Header from '../../components/header/header';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import Cities from '../../components/cities/cities';

function mapStateToProps(state: State) {
  return {
    offers: state.offers,
    activeCity: state.activeCity,
  };
}

function mapDispatchToProps(dispatch: Dispatch<ActionsType>) {
  return {
    loadCities(cityOffers: State['offers']) {
      dispatch(setCityOffers({ offers: cityOffers }));
    },
    changeActiveCity(cityName: State['activeCity']) {
      dispatch(setActiveCity({ cityName }));
    },
    changeActiveOffer(newActiveOffer: State['activeOffer']) {
      dispatch(setActiveOffer({ activeOffer: newActiveOffer }));
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type CitiesProps = PropsFromRedux;

function Main({ offers, activeCity, loadCities, changeActiveCity, changeActiveOffer }: CitiesProps): JSX.Element {
  useEffect(() => {
    //TODO. For now the logic of gettin cities in accordance to active city will be there
    loadCities(offersMoks.filter((offer) => offer.city.name === activeCity));
    changeActiveOffer(undefined);
  }, [activeCity, changeActiveOffer, loadCities]);

  const handleCityChange = (newActiveCity: ActiveCity) => {
    changeActiveCity(newActiveCity);
  };

  return (
    <div className="page page--gray page--main">
      <Header />

      <main
        className={classNames(
          'page__main',
          'page__main--index',
          { 'page__main--index-empty': offers.length === 0 },
        )}
      >
        <CitiesTabs activeCity={activeCity} onCityChange={handleCityChange} />
        <Cities activeCity={activeCity} offers={offers} />
      </main>
    </div>
  );
}

export default connector(Main);
