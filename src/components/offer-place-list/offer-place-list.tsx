import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Offer } from '../../types';
import { LoadStatus, PlaceCardType } from '../../helpers/enum';

import PlaceCard from '../place-card';
import Spinner from '../spinner';

type OfferPlaceListProps = {
  offers: Offer[];
};
function OfferPlaceList({ offers }: OfferPlaceListProps): JSX.Element {
  const nearbyOffersLoadStatus = useTypedSelector((state) => state.nearbyOffersLoadStatus);

  if (
    nearbyOffersLoadStatus === LoadStatus.LOADING ||
    nearbyOffersLoadStatus === LoadStatus.UNLOADED
  ) {
    return <Spinner centerX centerY />;
  }

  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <PlaceCard key={offer.id} offer={offer} type={PlaceCardType.OFFER} />
      ))}
    </div>
  );
}

export default OfferPlaceList;
