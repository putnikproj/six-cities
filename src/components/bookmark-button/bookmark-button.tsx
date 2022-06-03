import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { addOfferToFavorites, removeOfferFromFavorites } from '../../store/slices/favorites';
import { authStatusSelector } from '../../store/slices/user';
import { Offer } from '../../types';
import { AppRoute, AuthStatus } from '../../helpers/enum';
import { toast } from 'react-toastify';

type BookmarkButtonProps = {
  classNamePrefix: string;
  isActive: boolean;
  width: string;
  height: string;
  offer: Offer;
};

function BookmarkButton({ classNamePrefix, isActive, width, height, offer }: BookmarkButtonProps) {
  const [isInFavorites, setIsInFavorites] = useState(isActive);

  const dispatch = useTypedDispatch();
  const authStatus = useTypedSelector(authStatusSelector);
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    if (authStatus !== AuthStatus.AUTH) {
      navigate(AppRoute.LOGIN);
      toast.error('You should log in to do this action');
      return;
    }

    setIsInFavorites((prevState) => !prevState);
    try {
      if (isInFavorites) {
        await dispatch(removeOfferFromFavorites(offer));
      } else {
        await dispatch(addOfferToFavorites(offer));
      }
    } catch (err) {
      setIsInFavorites((prevState) => !prevState);
    }
  };

  return (
    <button
      className={classNames(`${classNamePrefix}__bookmark-button`, 'button', {
        [`${classNamePrefix}__bookmark-button--active`]: isInFavorites,
      })}
      type="button"
      onClick={handleButtonClick}
    >
      <svg className={`${classNamePrefix}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{`${isInFavorites ? 'In' : 'To'} bookmarks`}</span>
    </button>
  );
}

export default BookmarkButton;
