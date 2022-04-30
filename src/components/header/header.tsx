import { Link } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AppRoute, AuthStatus } from '../../helpers/enum';

import HeaderAuth from './header-auth';
import HeaderUnauth from './header-unauth';

function Header() {
  const authStatus = useTypedSelector((state) => state.authStatus);

  function getHeaderNavList() {
    switch (authStatus) {
      case AuthStatus.AUTH:
        return <HeaderAuth />;
      case AuthStatus.UNAUTH:
        return <HeaderUnauth />;
      default:
        return <div>Loading...</div>;
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

export default Header;
