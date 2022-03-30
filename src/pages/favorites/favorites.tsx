import { Offer } from '../../types/offer';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FavoritesPlaceList from '../../components/favorites-place-list/favorites-place-list';

type FavoritesPageProps = {
  offers: Offer[],
}

function Favorites({ offers }: FavoritesPageProps): JSX.Element {
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

      <Footer />
    </div>
  );
}

export default Favorites;
