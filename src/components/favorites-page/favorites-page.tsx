import Header from '../header/header';
import { Offers } from '../../types/offer';
import FavoritesPlaceCard from '../favorites-place-card/favorites-place-card';

type FavoritesPageProps = {
  offers: Offers,
}

function favoritesPage({ offers }: FavoritesPageProps): JSX.Element {
  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="/">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <FavoritesPlaceCard offer={offers[0]} />
                  <FavoritesPlaceCard offer={offers[1]} />
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="/">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <FavoritesPlaceCard offer={offers[2]} />
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

export default favoritesPage;
