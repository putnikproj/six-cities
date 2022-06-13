import { MouseEvent } from 'react';
import { Navigate, useLocation, Location, useNavigate } from 'react-router-dom';

import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { AppRoute, AuthStatus, CityName } from '../../helpers/enum';
import { authStatusSelector } from '../../store/slices/user';
import { getRandomIntInclusive } from '../../helpers/util';
import { activeCityChanged } from '../../store/slices/offers';

import Header from '../../components/header';
import Spinner from '../../components/spinner';
import LoginForm from './login-form';

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
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const location = useLocation() as LocationProps;
  const authStatus = useTypedSelector(authStatusSelector);
  const fromPage = getPrevUrl(location) || AppRoute.ROOT;

  if (authStatus === AuthStatus.LOADING) {
    return (
      <div style={{ height: '100vh' }}>
        <Spinner centerX centerY />
      </div>
    );
  }

  if (authStatus === AuthStatus.AUTH) {
    return <Navigate to={fromPage} replace />;
  }

  const cities = Object.values(CityName);
  const randomCity = cities[getRandomIntInclusive(0, cities.length - 1)];

  const handleCityClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(activeCityChanged(randomCity));
    navigate(AppRoute.ROOT);
  };

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in (type any valid email and password)</h1>
            <LoginForm />
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/" onClick={handleCityClick}>
                <span>{randomCity}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
