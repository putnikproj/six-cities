import { Link, Navigate, useLocation, Location } from 'react-router-dom';

import { useTypedSelector } from '../../hooks';
import { AppRoute, AuthStatus } from '../../helpers/enum';

import Header from '../../components/header';
import Spinner from '../../components/spinner';
import LoginForm from './login-form';
import { authStatusSelector } from '../../store/slices/user';

type LocationProps = Location & {
  state?: {
    prevLocation: Location;
  };
};

function getPrevUrl(location: LocationProps): string {
  if (location.state?.prevLocation) {
    const { pathname, search, hash } = location.state.prevLocation;
    return `${pathname}${search}${hash}`;
  }

  return '';
}

function Login(): JSX.Element {
  const location = useLocation() as LocationProps;
  const authStatus = useTypedSelector(authStatusSelector);

  const fromPage = getPrevUrl(location) || AppRoute.ROOT;

  if (authStatus === AuthStatus.UNKNOWN) {
    return (
      <div style={{ height: '100vh' }}>
        <Spinner centerX centerY />
      </div>
    );
  }

  if (authStatus === AuthStatus.AUTH) {
    return <Navigate to={fromPage} replace />;
  }

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
