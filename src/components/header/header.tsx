import { memo } from 'react';
import { Link } from 'react-router-dom';

import { useTypedSelector } from '../../hooks';
import { AppRoute, AuthStatus } from '../../helpers/enum';
import { authStatusSelector } from '../../store/slices/user';

import HeaderAuth from './header-auth';
import HeaderUnauth from './header-unauth';

function Header() {
  const authStatus = useTypedSelector(authStatusSelector);

  function getHeaderNavList() {
    switch (authStatus) {
      case AuthStatus.AUTH:
        return <HeaderAuth />;
      case AuthStatus.LOADING:
        return <div>Loading...</div>;
      case AuthStatus.IDLE:
        return <div>Loading...</div>;
      default:
        return <HeaderUnauth />;
    }
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.ROOT}>
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">{getHeaderNavList()}</nav>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
