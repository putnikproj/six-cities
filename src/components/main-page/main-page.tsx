import { Link } from 'react-router-dom';
import { Offers } from '../../types/offer';

import CitiesPlaceList from '../cities-place-list/cities-place-list';
import Header from '../header/header';

function CitiesTabs() {
  const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
  const activeCity = cities[3];

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">

            {cities.map((city) => (
              <li key={city} className="locations__item">
                <Link className={`locations__item-link tabs__item ${activeCity === city && 'tabs__item--active'}`} to="/">
                  <span>{city}</span>
                </Link>
              </li>
            ))}

          </ul>
        </section>
      </div>
    </>
  );
}

function PlacesSorting() {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        &nbsp;Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        <li className="places__option places__option--active" tabIndex={0}>Popular</li>
        <li className="places__option" tabIndex={0}>Price: low to high</li>
        <li className="places__option" tabIndex={0}>Price: high to low</li>
        <li className="places__option" tabIndex={0}>Top rated first</li>
      </ul>
    </form>
  );
}

// Main page component
type mainProps = {
  placesAmount: number,
  offers: Offers,
};

function MainPage({ placesAmount, offers }: mainProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <CitiesTabs />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesAmount} places to stay in Amsterdam</b>
              <PlacesSorting />
              <CitiesPlaceList offers={offers} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
