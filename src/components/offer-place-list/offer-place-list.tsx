import { LoadingStatus, PlaceCardType } from '../../helpers/enum';
import {
  nearbyOffersLoadingStatusSelector,
  nearbyOffersSelector,
} from '../../store/slices/active-offer';
import { useTypedSelector } from '../../hooks';

import PlaceCard from '../place-card';
import Spinner from '../spinner';

function OfferPlaceList(): JSX.Element {
  const nearbyOffers = useTypedSelector(nearbyOffersSelector);
  const loadingStatus = useTypedSelector(nearbyOffersLoadingStatusSelector);

  if (loadingStatus === LoadingStatus.LOADING) {
    return <Spinner centerX centerY />;
  }

  return (
    <div className="near-places__list places__list">
      {nearbyOffers.map((offer) => (
        <PlaceCard key={offer.id} offer={offer} type={PlaceCardType.OFFER} />
      ))}
    </div>
  );
}

export default OfferPlaceList;
