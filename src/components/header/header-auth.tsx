import { Link } from 'react-router-dom';

import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { authUserSelector, logout } from '../../store/slices/user';
import { AppRoute } from '../../helpers/enum';

function HeaderAuth() {
  const dispatch = useTypedDispatch();
  const user = useTypedSelector(authUserSelector);

  function handleLogoutButtonCLick() {
    dispatch(logout());
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
          <div
            className="header__avatar-wrapper user__avatar-wrapper"
            style={{ backgroundImage: `url(${user.avatarUrl})` }}
          ></div>
          <span className="header__user-name user__name">{user.email}</span>
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
    </ul>
  );
}

export default HeaderAuth;
