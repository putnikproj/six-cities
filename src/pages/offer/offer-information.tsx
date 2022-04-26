import classNames from 'classnames';

import { capitalizeFirstLetter } from '../../helpers/util';
import { Offer } from '../../types';

import Stars from '../../components/stars';
import PremiumLabel from '../../components/premium-label';
import BookmarkButton from '../../components/bookmark-button';

function OfferInformation({ offer }: { offer: Offer }) {
  return (
    <>
      {offer.isPremium && <PremiumLabel classNames="property__mark" />}

      {/* Title and button bookmark button */}
      <div className="property__name-wrapper">
        <h1 className="property__name">{offer.title}</h1>
        <BookmarkButton
          containerClassNames={classNames('property__bookmark-button', 'button', {
            'property__bookmark-button--active': offer.isFavorite,
          })}
          imageClassNames="property__bookmark-icon"
          isActive={offer.isFavorite}
          width="31"
          height="33"
        />
      </div>

      {/* Rating */}
      <div className="property__rating rating">
        <Stars rating={offer.rating} containerClassNames={'property__stars'} />
        <span className="property__rating-value rating__value">{offer.rating}</span>
      </div>

      {/* Type, bedrooms, maxAdults */}
      <ul className="property__features">
        <li className="property__feature property__feature--entire">
          {capitalizeFirstLetter(offer.type)}
        </li>
        <li className="property__feature property__feature--bedrooms">
          {offer.bedrooms === 1 ? '1 Bedroom' : `${offer.bedrooms} Bedrooms`}
        </li>
        <li className="property__feature property__feature--adults">
          {offer.maxAdults === 1 ? 'Max 1 adult' : `Max ${offer.maxAdults} adults`}
        </li>
      </ul>

      {/* Price */}
      <div className="property__price">
        <b className="property__price-value">&euro;{offer.price}</b>
        <span className="property__price-text">&nbsp;night</span>
      </div>

      {/* What's inside */}
      <div className="property__inside">
        <h2 className="property__inside-title">What&apos;s inside</h2>
        <ul className="property__inside-list">
          {offer.goods.map((good) => (
            <li key={good} className="property__inside-item">
              {good}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default OfferInformation;
