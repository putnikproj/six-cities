import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AppRoute, AuthStatus } from '../../helpers/enum';

type PrivateRouteProps = {
  children?: ReactNode | undefined;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authStatus = useTypedSelector((state) => state.authStatus);

  return authStatus === AuthStatus.AUTH ? (
    <> {children} </>
  ) : (
    <Navigate to={AppRoute.LOGIN} replace />
  );
}

export default PrivateRoute;
