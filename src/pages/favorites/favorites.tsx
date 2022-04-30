import classNames from 'classnames';

import { useTypedSelector } from '../../hooks';

import Header from '../../components/header';
import Footer from '../../components/footer';
import FavoritesEmpty from './favorites-empty';
import FavoritesPlaceList from '../../components/favorites-place-list';

function Favorites(): JSX.Element {
  const offers = useTypedSelector((state) => state.offers);

  return (
    <div className={classNames('page', { 'page--favorites-empty': offers.length === 0 })}>
      <Header />

      <main
        className={classNames('page__main', 'page__main--favorites', {
          'page__main--favorites-empty': offers.length === 0,
        })}
      >
        {offers.length === 0 ? (
          <FavoritesEmpty />
        ) : (
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesPlaceList offers={offers} />
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Favorites;
