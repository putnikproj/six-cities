import { IS_AUTH } from '../../helpers/const';
import { useEffect } from 'react';
import { AppRoute } from '../../helpers/enum';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { checkAuth } from '../../store/api-actions';

import Main from '../../pages/main';
import Offer from '../../pages/offer';
import Login from '../../pages/login';
import NotFound from '../../pages/not-found';
import Favorites from '../../pages/favorites';
import PrivateRoute from '../private-route';

function App(): JSX.Element {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

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
