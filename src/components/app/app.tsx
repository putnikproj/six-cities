import { IS_AUTH } from '../../helpers/const';
import { AppRoute } from '../../helpers/enum';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route';

import Main from '../../pages/main';
import Offer from '../../pages/offer';
import Login from '../../pages/login';
import NotFound from '../../pages/not-found';
import Favorites from '../../pages/favorites';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.ROOT} element={<Main />} />
        <Route path={AppRoute.LOGIN} element={<Login />} />
        <Route
          path={AppRoute.FAVORITES}
          element={
            <PrivateRoute isAuth={IS_AUTH}>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path={`${AppRoute.OFFER}/:id`} element={<Offer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
