import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { useTypedSelector, useTypedDispatch } from '../../hooks';
import { offerToPoint } from '../../helpers/util';
import { loadNearbyOffers, loadOffer, loadReviews } from '../../store/api-actions';
import { AuthStatus, ResponseCodes } from '../../helpers/enum';
import { handleAPIError } from '../../helpers/api';

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
  const authStatus = useTypedSelector((state) => state.authStatus);

  // Offer
  const [isOfferLoading, setIsOfferLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<AxiosError | undefined>(undefined);
  const offer = useTypedSelector((state) => state.activeOffer);

  // Nearby offers
  const [areNearbyOffersLoading, setAreNearbyOffersLoading] = useState(true);
  const nearbyOffers = useTypedSelector((state) => state.nearbyOffers).slice(
    0,
    MAX_OFFER_NEAR_PLACES,
  );

  // Reviews
  const [isReviewsLoading, setIsReviewsLoading] = useState(true);

  const dispatch = useTypedDispatch();

  const navigate = useNavigate();
  const { id } = useParams();
  const offerId = id || '';

  useEffect(() => {
    const makeOfferRequest = async () => {
      try {
        await dispatch(loadOffer(offerId));
      } catch (err) {
        handleAPIError(err, (error) => {
          if (error.response?.status !== ResponseCodes.NOT_FOUND) {
            toast.error(error.message);
          }

          setLoadingError(error);
        });
      }
      setIsOfferLoading(false);
    };

    const makeNearbyOffersRequest = async () => {
      try {
        await dispatch(loadNearbyOffers(offerId));
      } catch (err) {
        handleAPIError(err, () => undefined);
      }
      setAreNearbyOffersLoading(false);
    };

    const makeReviewsRequest = async () => {
      try {
        await dispatch(loadReviews(offerId));
      } catch (err) {
        handleAPIError(err, () => undefined);
      }
      setIsReviewsLoading(false);
    };

    // Parallel requests
    makeOfferRequest();
    makeNearbyOffersRequest();
    makeReviewsRequest();
  }, [dispatch, navigate, offerId]);

  if (isOfferLoading) {
    return (
      <div style={{ height: '100vh' }}>
        <Spinner centerX centerY />
      </div>
    );
  }

  if (loadingError || !offer) {
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
                <ReviewsList isLoading={isReviewsLoading} />
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
            <OfferPlaceList offers={nearbyOffers} isLoading={areNearbyOffersLoading} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
