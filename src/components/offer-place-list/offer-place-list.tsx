import { Offers } from '../../types/offer';
import { MAX_OFFER_NEAR_PLACES, PlaceCardType } from '../../const';

import PlaceCard from '../place-card/place-card';

type OfferPlaceListProps = {
  offers: Offers,
};
function OfferPlaceList({ offers }: OfferPlaceListProps): JSX.Element {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer, index) => (index < MAX_OFFER_NEAR_PLACES && <PlaceCard key={offer.id} offer={offer} type={PlaceCardType.OFFER} />))}
    </div>
  );
}

export default OfferPlaceList;
