import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { logout } from '../../store/api-actions';
import { AppRoute } from '../../helpers/enum';

const SUCCESS_LOGOUT_TEXT = 'You have successfully logged out';

function HeaderAuth() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useTypedDispatch();
  const user = useTypedSelector((state) => state.authUser);

  async function handleLogoutButtonCLick() {
    setIsLoading(true);

    try {
      await dispatch(logout());
      toast.success(SUCCESS_LOGOUT_TEXT);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.message);
      }
    }

    setIsLoading(false);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
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
    </ul>
  );
}

export default HeaderAuth;
