import { AppRoute, IS_AUTH } from '../../const';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import { Offers } from '../../types/offer';
import { reviews } from '../../mocks/reviews';

import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import NotFound from '../../pages/not-found/not-found';

type AppProps = {
  placesAmount: number,
  offers: Offers
};

function App({ placesAmount, offers }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.ROOT} element={<Main offers={offers} placesAmount={placesAmount} />} />
        <Route path={AppRoute.LOGIN} element={<Login />} />
        <Route path={AppRoute.FAVORITES} element={
          <PrivateRoute isAuth={IS_AUTH} element={<Favorites offers={offers} />} />
        }
        />
        <Route path={`${AppRoute.OFFER}/:id`} element={<Offer offers={offers} reviews={reviews} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
