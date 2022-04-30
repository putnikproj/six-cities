import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { logout } from '../../store/api-actions';
import { AppRoute } from '../../helpers/enum';

const SUCCESS_LOGOUT_TEXT = 'You have successfully logged out';

function HeaderAuth() {
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((state) => state.authUser);

  async function handleLogoutButtonCLick() {
    try {
      await dispatch(logout());
      toast.success(SUCCESS_LOGOUT_TEXT);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.message);
      }
    }
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
