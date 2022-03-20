import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type PrivateRouteProps = {
  element: JSX.Element,
  isAuth: boolean,
};

function PrivateRoute({element, isAuth}: PrivateRouteProps): JSX.Element {
  return (
    isAuth
      ? element
      : <Navigate to={AppRoute.LOGIN} replace />
  );
}

export default PrivateRoute;
