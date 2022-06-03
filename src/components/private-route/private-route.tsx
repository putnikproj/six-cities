import { toast } from 'react-toastify';
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useTypedSelector } from '../../hooks';
import { AppRoute, AuthStatus } from '../../helpers/enum';
import { authStatusSelector } from '../../store/slices/user';

import Spinner from '../spinner';

const UNAUTH_USER_TEXT = 'You should log in to view this page';

type PrivateRouteProps = {
  children?: ReactNode | undefined;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const location = useLocation();
  const authStatus = useTypedSelector(authStatusSelector);

  useEffect(() => {
    if (authStatus === AuthStatus.UNAUTH) {
      toast.error(UNAUTH_USER_TEXT);
    }
  }, [authStatus]);

  switch (authStatus) {
    case AuthStatus.LOADING:
      return (
        <div style={{ height: '100vh' }}>
          <Spinner centerX centerY />
        </div>
      );
    case AuthStatus.AUTH:
      return <> {children} </>;
    case AuthStatus.UNAUTH:
      return <Navigate to={AppRoute.LOGIN} state={{ prevLocation: location }} replace />;
    case AuthStatus.UNKNOWN:
      return <Navigate to={AppRoute.ROOT} state={{ prevLocation: location }} replace />;
    default:
      return <div className="page"></div>;
  }
}

export default PrivateRoute;
