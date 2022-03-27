import { useParams } from 'react-router-dom';
import { Offer, Offers } from '../../types/offer';
import { Review, Reviews } from '../../types/review';
import { capitalizeFirstLetter } from '../../util';
import { MAX_OFFER_IMAGES, MAX_OFFER_REVIEWS } from '../../const';

import NotFoundPage from '../not-found-page/not-found-page';
import AddReviewForm from '../add-review-form/add-review-form';
import Header from '../header/header';

function Gallery({ images }: { images: Offer['images'] }) {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {
          images.map((image, index) => (
            (index < MAX_OFFER_IMAGES) && (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className="property__image-wrapper">
                <img className="property__image" src={image} alt="studio" />
              </div>
            )
          ))
        }
      </div>
    </div>
  );
}

function OfferInformation({ offer, rating }: { offer: Offer, rating: number }) {
  return (
    <>
      {/* Premium block */}
      { offer.isPremium
        ? <div className="property__mark"><span>Premium</span></div>
        : null }

      {/* Title and button to favorites */}
      <div className="property__name-wrapper">
        <h1 className="property__name">
          { offer.title }
        </h1>
        <button
          className={
            'property__bookmark-button button'
              .concat(offer.isFavorite ? ' property__bookmark-button--active' : '')
          }
          type="button"
        >
          <svg className="property__bookmark-icon" width="31" height="33">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>

      {/* Rating */}
      <div className="property__rating rating">
        <div className="property__stars rating__stars">
          <span style={{width: `${0 + rating * 20}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="property__rating-value rating__value">4.8</span>
      </div>

      {/* Type, bedrooms, maxAdults block */}
      <ul className="property__features">
        <li className="property__feature property__feature--entire">
          { capitalizeFirstLetter(offer.type) }
        </li>
        <li className="property__feature property__feature--bedrooms">
          { offer.bedrooms === 1 ? '1 Bedroom' : `${offer.bedrooms} Bedrooms` }
        </li>
        <li className="property__feature property__feature--adults">
          { offer.maxAdults === 1 ? 'Max 1 adult' : `Max ${offer.maxAdults} adults` }
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
          { offer.goods.map((good) => (
            <li key={good} className="property__inside-item">
              {good}
            </li>
          )) }
        </ul>
      </div>
    </>
  );
}

function MeetTheHost({ offer }: { offer: Offer }) {
  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>
      <div className="property__host-user user">
        <div
          className={
            'property__avatar-wrapper user__avatar-wrapper'
              .concat(offer.host.isPro ? ' property__avatar-wrapper--pro' : '')
          }
        >
          <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
        </div>
        <span className="property__user-name">
          { offer.host.name }
        </span>
        { (offer.host.isPro) && <span className="property__user-status">Pro</span> }
      </div>
      <div className="property__description">
        <p className="property__text">
          { offer.description }
        </p>
      </div>
    </div>
  );
}

function ReviewBlock({ review }: { review: Review }) {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${0 + review.rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={review.date}>
          {new Date(review.date).toLocaleString('en-US', {month: 'long', year: 'numeric'})}
        </time>
      </div>
    </li>
  );
}

function ReviewsBlock({ reviews }: { reviews: Reviews }) {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review, index) => (index < MAX_OFFER_REVIEWS) && (<ReviewBlock key={review.id} review={review} />))}
      </ul>
      <AddReviewForm />
    </section>
  );
}

function NearPlacesList() {
  return (
    <div className="near-places__list places__list">
      <article className="near-places__card place-card">
        <div className="near-places__image-wrapper place-card__image-wrapper">
          <a href="/">
            <img className="place-card__image" src="img/room.jpg" width="260" height="200" alt="Place" />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;80</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">In bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: '80%'}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="/">Wood and stone place</a>
          </h2>
          <p className="place-card__type">Private room</p>
        </div>
      </article>

      <article className="near-places__card place-card">
        <div className="near-places__image-wrapper place-card__image-wrapper">
          <a href="/">
            <img className="place-card__image" src="img/apartment-02.jpg" width="260" height="200" alt="Place" />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;132</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: '80%'}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="/">Canal View Prinsengracht</a>
          </h2>
          <p className="place-card__type">Apartment</p>
        </div>
      </article>

      <article className="near-places__card place-card">
        <div className="near-places__image-wrapper place-card__image-wrapper">
          <a href="/">
            <img className="place-card__image" src="img/apartment-03.jpg" width="260" height="200" alt="Place" />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;180</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: '100%'}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="/">Nice, cozy, warm big bed apartment</a>
          </h2>
          <p className="place-card__type">Apartment</p>
        </div>
      </article>
    </div>
  );
}

type OfferPageProps = {
  offers: Offers,
  reviews: Reviews
};
function OfferPage({ offers, reviews }: OfferPageProps): JSX.Element {

  const { id } = useParams();
  const offer = offers.find((elem) => elem.id === Number(id));
  if (!offer) {
    return <NotFoundPage />;
  }

  const rating = Math.round(offer.rating);

  return (
    <div className='page'>
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <Gallery images={offer.images} />

          <div className="property__container container">
            <div className="property__wrapper">

              <OfferInformation offer={offer} rating={rating} />
              <MeetTheHost offer={offer} />
              <ReviewsBlock reviews={reviews} />

            </div>
          </div>

          <section className="property__map map"></section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearPlacesList />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
