import { Offers } from '../../types/offer';
import { city } from '../../mocks/city';
import { offerToPoint } from '../../util';

import CitiesPlaceList from '../../components/cities-place-list/cities-place-list';
import Header from '../../components/header/header';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import Map from '../../components/map/map';

// Main page component
type mainProps = {
  placesAmount: number,
  offers: Offers,
};

function Main({ placesAmount, offers }: mainProps): JSX.Element {
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
              <section className="cities__map map">
                <Map
                  city={city}
                  points={offers.map((offer) => offerToPoint(offer))}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
