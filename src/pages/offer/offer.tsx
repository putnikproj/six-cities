import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { Offer as OfferType } from '../../types/offer';
import { User } from '../../types/user';
import { capitalizeFirstLetter, offerToPoint } from '../../helpers/util';
import { MAX_OFFER_IMAGES, MAX_OFFER_NEAR_PLACES } from '../../helpers/const';
import { city } from '../../mocks/city';
import { reviews } from '../../mocks/reviews';
import { loadReviews, setActiveOffer } from '../../store/action';

import NotFound from '../not-found';
import Map from '../../components/map';
import Stars from '../../components/stars';
import Header from '../../components/header';
import ReviewsList from '../../components/reviews-list';
import PremiumLabel from '../../components/premium-label';
import AddReviewForm from '../../components/add-review-form';
import BookmarkButton from '../../components/bookmark-button';
import OfferPlaceList from '../../components/offer-place-list';

function Gallery({ images }: { images: OfferType['images'] }) {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.map(
          (image, index) =>
            index < MAX_OFFER_IMAGES && (
              // There I can use index as key, because this elem is static, it won't be changed
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className="property__image-wrapper">
                <img className="property__image" src={image} alt="studio" />
              </div>
            ),
        )}
      </div>
    </div>
  );
}

function OfferInformation({ offer }: { offer: OfferType }) {
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

function MeetTheHost({ host, description }: { host: User; description: OfferType['description'] }) {
  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>

      {/* Avatar */}
      <div className="property__host-user user">
        <div
          className={classNames('property__avatar-wrapper', 'user__avatar-wrapper', {
            'property__avatar-wrapper--pro': host.isPro,
          })}
        >
          <img
            className="property__avatar user__avatar"
            src={host.avatarUrl}
            width="74"
            height="74"
            alt="Host avatar"
          />
        </div>
        <span className="property__user-name">{host.name}</span>
        {host.isPro && <span className="property__user-status">Pro</span>}
      </div>

      {/* Description */}
      <div className="property__description">
        <p className="property__text">{description}</p>
      </div>
    </div>
  );
}

function Offer(): JSX.Element {
  const offers = useTypedSelector((state) => state.offers);
  const dispatch = useTypedDispatch();

  const { id } = useParams();
  const offer = offers.find((elem) => elem.id === Number(id));
  const offersNearby = offers.slice(0, MAX_OFFER_NEAR_PLACES);

  useEffect(() => {
    dispatch(setActiveOffer(offer || null));
    dispatch(loadReviews(reviews));
  }, [dispatch, offer]);

  if (!offer) {
    return <NotFound />;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <Gallery images={offer.images} />

          <div className="property__container container">
            <div className="property__wrapper">
              <OfferInformation offer={offer} />
              <MeetTheHost host={offer.host} description={offer.description} />
              <section className="property__reviews reviews">
                <ReviewsList />
                <AddReviewForm />
              </section>
            </div>
          </div>

          <section className="property__map map">
            <Map city={city} points={offersNearby.map((item) => offerToPoint(item))} />
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferPlaceList offers={offersNearby} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
