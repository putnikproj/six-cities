import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useTypedSelector, useTypedDispatch } from '../../hooks';
import {
  activeOfferErrorSelector,
  activeOfferLoadingStatusSelector,
  activeOfferOutdated,
  activeOfferSelector,
  loadOffer,
  mapPointsSelector,
} from '../../store/slices/active-offer';
import { authStatusSelector } from '../../store/slices/user';
import { AuthStatus, LoadingStatus } from '../../helpers/enum';

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

function Offer(): JSX.Element {
  const dispatch = useTypedDispatch();
  const authStatus = useTypedSelector(authStatusSelector);

  const { id } = useParams();
  const offerId = id || '';

  const offer = useTypedSelector(activeOfferSelector);
  const loadingStatus = useTypedSelector(activeOfferLoadingStatusSelector);
  const error = useTypedSelector(activeOfferErrorSelector);

  const mapPoints = useTypedSelector(mapPointsSelector);

  useEffect(() => {
    dispatch(loadOffer(offerId));

    return () => {
      dispatch(activeOfferOutdated());
    };
  }, [dispatch, offerId]);

  if (loadingStatus === LoadingStatus.LOADING) {
    return (
      <div style={{ height: '100vh' }}>
        <Spinner centerX centerY />
      </div>
    );
  }

  if (loadingStatus === LoadingStatus.FAILED && error) {
    return <NotFound />;
  }

  if (loadingStatus === LoadingStatus.SUCCEEDED && offer) {
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
              <Map location={offer.location} points={mapPoints} />
            </section>
          </section>

          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <OfferPlaceList />
            </section>
          </div>
        </main>
      </div>
    );
  }

  return <div className="page"></div>;
}

export default Offer;
