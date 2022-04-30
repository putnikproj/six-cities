import { toast } from 'react-toastify';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AppRoute, AuthStatus } from '../../helpers/enum';

import Spinner from '../spinner';

type PrivateRouteProps = {
  children?: ReactNode | undefined;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const location = useLocation();
  const authStatus = useTypedSelector((state) => state.authStatus);

  switch (authStatus) {
    case AuthStatus.AUTH:
      return <> {children} </>;
    case AuthStatus.UNAUTH:
      toast.error('You should log in to view this page');
      return <Navigate to={AppRoute.LOGIN} state={{ prevLocation: location }} replace />;
    default:
      return (
        <div style={{ height: '100vh' }}>
          <Spinner centerX centerY />
        </div>
      );
  }
}

export default PrivateRoute;
