import { useEffect } from 'react';
import classNames from 'classnames';

import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { LoadingStatus } from '../../helpers/enum';
import {
  areZeroFavoriteOffersSelector,
  favoriteOffersLoadingErrorSelector,
  favoriteOffersLoadingSelector,
  favoritesUnmounted,
  loadFavoriteOffers,
} from '../../store/slices/favorites';

import Header from '../../components/header';
import Footer from '../../components/footer';
import Spinner from '../../components/spinner';
import FavoritesEmpty from './favorites-empty';
import FavoritesPlaceList from '../../components/favorites-place-list';

function Favorites(): JSX.Element {
  const dispatch = useTypedDispatch();
  const zeroOffers = useTypedSelector(areZeroFavoriteOffersSelector);
  const loadingStatus = useTypedSelector(favoriteOffersLoadingSelector);
  const error = useTypedSelector(favoriteOffersLoadingErrorSelector);

  useEffect(() => {
    dispatch(loadFavoriteOffers());
    return () => {
      dispatch(favoritesUnmounted());
    };
  }, [dispatch]);

  function getMainContent() {
    if (loadingStatus === LoadingStatus.IDLE || loadingStatus === LoadingStatus.LOADING) {
      return <Spinner centerX centerY />;
    } else if (error) {
      return <FavoritesEmpty error={error} />;
    } else if (zeroOffers) {
      return <FavoritesEmpty />;
    }

    return <FavoritesPlaceList />;
  }

  return (
    <div className={classNames('page', { 'page--favorites-empty': zeroOffers })}>
      <Header />

      <main
        className={classNames('page__main', 'page__main--favorites', {
          'page__main--favorites-empty': zeroOffers,
        })}
      >
        <div className="page__favorites-container container">{getMainContent()}</div>
      </main>

      <Footer />
    </div>
  );
}

export default Favorites;
