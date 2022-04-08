import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoute } from '../../const';

type PrivateRouteProps = PropsWithChildren<{
  isAuth: boolean;
}>;

function PrivateRoute({ children, isAuth }: PrivateRouteProps): JSX.Element {
  return isAuth ? <> {children} </> : <Navigate to={AppRoute.LOGIN} replace />;
}

export default PrivateRoute;
