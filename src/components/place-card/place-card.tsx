import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { AppRoute, PlaceCardPrefix, PlaceCardType } from '../../const';
import { Offer } from '../../types/offer';
import { capitalizeFirstLetter } from '../../util';

import Stars from '../stars/stars';

type Keys = keyof typeof PlaceCardType;
type Values = typeof PlaceCardType[Keys];

type PlaceCardProps = {
  offer: Offer,
  type: Values,
}

function PlaceCard({ offer, type }: PlaceCardProps): JSX.Element {
  const isPremium = offer.isPremium && (type !== PlaceCardType.FAVORITES);

  const classNamePrefix = PlaceCardPrefix[type];

  return (
    <article className={classNames(
      'place-card',
      { [`${classNamePrefix}__card`]: type !== PlaceCardType.MAIN },
      { [`${classNamePrefix}__place-card`]: type === PlaceCardType.MAIN },
    )}
    >

      {isPremium && <div className="place-card__mark"><span>Premium</span></div> }

      <div className={classNames(
        'place-card__image-wrapper',
        `${classNamePrefix}__image-wrapper`,
      )}
      >
        <Link to={`${AppRoute.OFFER}/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={type === PlaceCardType.FAVORITES ? '150' : '260'}
            height={type === PlaceCardType.FAVORITES ? '110' : '200'}
            alt="Place"
          />
        </Link>
      </div>

      <div className={classNames(
        'place-card__info',
        { 'favorites__card-info': type === PlaceCardType.FAVORITES },
      )}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={classNames(
              'place-card__bookmark-button',
              'button',
              { 'place-card__bookmark-button--active': offer.isFavorite },
            )}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{`${ offer.isFavorite ? 'In' : 'To' } bookmarks`}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <Stars rating={offer.rating} containerClassNames={'place-card__stars'} />
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.OFFER}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(offer.type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
