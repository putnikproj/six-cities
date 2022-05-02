import { Offer } from '../../types';
import { PlaceCardType } from '../../helpers/enum';

import PlaceCard from '../place-card';
import Spinner from '../spinner';

type OfferPlaceListProps = {
  offers: Offer[];
  isLoading: boolean;
};
function OfferPlaceList({ offers, isLoading }: OfferPlaceListProps): JSX.Element {
  if (isLoading) {
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
