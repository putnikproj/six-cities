import { Offers } from '../../types/offer';

import Header from '../header/header';
import FavoritesPlaceList from '../favorites-place-list/favorites-place-list';

type FavoritesPageProps = {
  offers: Offers,
}

function FavoritesPage({ offers }: FavoritesPageProps): JSX.Element {
  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesPlaceList offers={offers} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default FavoritesPage;
