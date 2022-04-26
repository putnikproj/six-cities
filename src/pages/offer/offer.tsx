import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { offerToPoint } from '../../helpers/util';
import { MAX_OFFER_NEAR_PLACES } from '../../helpers/const';
import { city } from '../../mocks/city';
import { reviews } from '../../mocks/reviews';
import { loadReviews, setActiveOffer } from '../../store/action';

import Map from '../../components/map';
import Header from '../../components/header';
import Gallery from './gallery';
import NotFound from '../not-found';
import MeetTheHost from './meet-the-host';
import ReviewsList from '../../components/reviews-list';
import AddReviewForm from '../../components/add-review-form';
import OfferPlaceList from '../../components/offer-place-list';
import OfferInformation from './offer-information';

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
