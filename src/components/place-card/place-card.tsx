import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { AppRoute, PlaceCardPrefix, PlaceCardType } from '../../const';
import { Offer } from '../../types/offer';
import { capitalizeFirstLetter } from '../../util';

import Stars from '../stars/stars';
import BookmarkButton from '../bookmark-button/bookmark-button';
import PremiumLabel from '../premium-label/premium-label';

type PlaceCardProps = {
  offer: Offer;
  type: PlaceCardType;
};

function PlaceCard({ offer, type }: PlaceCardProps): JSX.Element {
  const isPremium = offer.isPremium && type !== PlaceCardType.FAVORITES;
  const classNamePrefix = PlaceCardPrefix[type];

  function renderImage(): JSX.Element {
    return (
      <>
        {isPremium && <PremiumLabel classNames="place-card__mark" />}

        <div
          className={classNames('place-card__image-wrapper', `${classNamePrefix}__image-wrapper`)}
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
      </>
    );
  }

  function renderInformation(): JSX.Element {
    return (
      <div
        className={classNames('place-card__info', {
          'favorites__card-info': type === PlaceCardType.FAVORITES,
        })}
      >
        {/* Renders price and bookmark button */}
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton
            containerClassNames={classNames('place-card__bookmark-button', 'button', {
              'place-card__bookmark-button--active': offer.isFavorite,
            })}
            imageClassNames="place-card__bookmark-icon"
            isActive={offer.isFavorite}
            width="18"
            height="19"
          />
        </div>

        {/* Renders rating */}
        <div className="place-card__rating rating">
          <Stars rating={offer.rating} containerClassNames={'place-card__stars'} />
        </div>

        {/* Renders title and type */}
        <h2 className="place-card__name">
          <Link to={`${AppRoute.OFFER}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(offer.type)}</p>
      </div>
    );
  }

  return (
    <article
      className={classNames(
        'place-card',
        { [`${classNamePrefix}__card`]: type !== PlaceCardType.MAIN },
        { [`${classNamePrefix}__place-card`]: type === PlaceCardType.MAIN },
      )}
    >
      {renderImage()}
      {renderInformation()}
    </article>
  );
}

export default PlaceCard;
