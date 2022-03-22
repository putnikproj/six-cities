import { AppRoute, IS_AUTH } from '../../const';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import { Offers } from '../../types/offer';

import MainPage from '../main-page/main-page';
import LoginPage from '../login-page/login-page';
import FavoritesPage from '../favorites-page/favorites-page';
import OfferPage from '../offer-page/offer-page';
import NotFoundPage from '../not-found-page/not-found-page';

type AppProps = {
  placesAmount: number,
  offers: Offers
};

function App({ placesAmount, offers }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.ROOT} element={<MainPage placesAmount={placesAmount} />} />
        <Route path={AppRoute.LOGIN} element={<LoginPage />} />
        <Route path={AppRoute.FAVORITES} element={
          <PrivateRoute isAuth={IS_AUTH} element={<FavoritesPage />} />
        }
        />
        <Route path={AppRoute.OFFER} element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
