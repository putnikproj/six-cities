import { Offer } from '../../types/offer';
import { PlaceCardType } from '../../const';

import PlaceCard from '../place-card/place-card';

type OfferPlaceListProps = {
  offers: Offer[];
};
function OfferPlaceList({ offers }: OfferPlaceListProps): JSX.Element {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <PlaceCard key={offer.id} offer={offer} type={PlaceCardType.OFFER} />
      ))}
    </div>
  );
}

export default OfferPlaceList;
