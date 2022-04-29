import { Link } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { AppRoute, AuthStatus } from '../../helpers/enum';
import { logout } from '../../store/api-actions';

function Header() {
  const authStatus = useTypedSelector((state) => state.authStatus);
  const user = useTypedSelector((state) => state.authUser);
  const dispatch = useTypedDispatch();

  function handleLogoutButtonCLick() {
    dispatch(logout());
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
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authStatus === AuthStatus.AUTH ? (
                <>
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.FAVORITES}
                    >
                      <div
                        className="header__avatar-wrapper user__avatar-wrapper"
                        style={{ backgroundImage: user ? `url(${user.avatarUrl})` : undefined }}
                      ></div>
                      <span className="header__user-name user__name">{user?.email}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <button
                      onClick={handleLogoutButtonCLick}
                      className="header__nav-link header__nav-link--profile"
                      style={{ backgroundColor: 'inherit', border: 'none', cursor: 'pointer' }}
                    >
                      <span className="header__signout">Sign out</span>
                    </button>
                  </li>
                </>
              ) : (
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.LOGIN}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
