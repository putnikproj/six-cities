import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useTypedSelector, useTypedDispatch } from '../../hooks';
import { offerToPoint } from '../../helpers/util';
import { loadNearbyOffers, loadOffer, loadReviews } from '../../store/api-actions';
import { AuthStatus, LoadStatus } from '../../helpers/enum';
import {
  setActiveOfferLoadStatus,
  setNearbyOffersLoadStatus,
  setReviewsLoadStatus,
} from '../../store/action';

import Map from '../../components/map';
import Header from '../../components/header';
import Spinner from '../../components/spinner';
import Gallery from './gallery';
import NotFound from '../not-found';
import MeetTheHost from './meet-the-host';
import ReviewsList from '../../components/reviews-list';
import AddReviewForm from '../../components/add-review-form';
import OfferPlaceList from '../../components/offer-place-list';
import OfferInformation from './offer-information';

const MAX_OFFER_NEAR_PLACES = 3;

function Offer(): JSX.Element {
  const activeOfferLoadStatus = useTypedSelector((state) => state.activeOfferLoadStatus);
  const authStatus = useTypedSelector((state) => state.authStatus);
  const offer = useTypedSelector((state) => state.activeOffer);
  const nearbyOffers = useTypedSelector((state) => state.nearbyOffers).slice(
    0,
    MAX_OFFER_NEAR_PLACES,
  );

  const dispatch = useTypedDispatch();

  const { id } = useParams();
  const offerId = id || '';

  useEffect(() => {
    dispatch(loadOffer(offerId));
    dispatch(loadNearbyOffers(offerId));
    dispatch(loadReviews(offerId));

    return () => {
      dispatch(setActiveOfferLoadStatus(LoadStatus.UNLOADED));
      dispatch(setNearbyOffersLoadStatus(LoadStatus.UNLOADED));
      dispatch(setReviewsLoadStatus(LoadStatus.UNLOADED));
    };
  }, [dispatch, offerId]);

  if (
    activeOfferLoadStatus === LoadStatus.LOADING ||
    activeOfferLoadStatus === LoadStatus.UNLOADED
  ) {
    return (
      <div style={{ height: '100vh' }}>
        <Spinner centerX centerY />
      </div>
    );
  }

  if (activeOfferLoadStatus === LoadStatus.ERROR || !offer) {
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
                {authStatus === AuthStatus.AUTH && <AddReviewForm id={offerId} />}
              </section>
            </div>
          </div>

          <section className="property__map map">
            <Map
              location={offer.location}
              points={nearbyOffers.map((item) => offerToPoint(item))}
            />
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferPlaceList offers={nearbyOffers} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
