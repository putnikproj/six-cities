import { useEffect, useState } from 'react';
import classNames from 'classnames';
import axios, { AxiosError } from 'axios';

import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { favoriteOffersSelector, loadFavoriteOffers } from '../../store/slices/favorites';

import Header from '../../components/header';
import Footer from '../../components/footer';
import Spinner from '../../components/spinner';
import FavoritesEmpty from './favorites-empty';
import FavoritesPlaceList from '../../components/favorites-place-list';

function Favorites(): JSX.Element {
  const dispatch = useTypedDispatch();
  const offers = useTypedSelector(favoriteOffersSelector);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  function handleError(err: unknown) {
    if (axios.isAxiosError(err)) {
      setError(err);
    }
  }

  useEffect(() => {
    const loadOffers = async () => {
      setIsLoading(true);

      try {
        await dispatch(loadFavoriteOffers());
      } catch (err) {
        handleError(err);
      }

      setIsLoading(false);
    };

    loadOffers();
  }, [dispatch]);

  function getMainContent() {
    if (isLoading) {
      return <Spinner centerX centerY />;
    } else if (error) {
      return <FavoritesEmpty error={error} />;
    } else if (offers.length === 0) {
      return <FavoritesEmpty />;
    }

    return (
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <FavoritesPlaceList offers={offers} />
      </section>
    );
  }

  return (
    <div className={classNames('page', { 'page--favorites-empty': offers.length === 0 })}>
      <Header />

      <main
        className={classNames('page__main', 'page__main--favorites', {
          'page__main--favorites-empty': offers.length === 0,
        })}
      >
        <div className="page__favorites-container container">{getMainContent()}</div>
      </main>

      <Footer />
    </div>
  );
}

export default Favorites;
