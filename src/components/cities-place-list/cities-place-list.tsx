import { Offer, Offers } from '../../types/offer';
import { Point } from '../../types/point';
import { PlaceCardType } from '../../const';
import { offerToPoint } from '../../util';

import PlaceCard from '../place-card/place-card';

type CitiesPlaceListProps = {
  offers: Offers,
  onCardEnterLeave: (point?: Point | undefined) => void,
};

function PlaceList({ offers, onCardEnterLeave }: CitiesPlaceListProps): JSX.Element  {

  function handleMouseEnterLeave(offer?: Offer | undefined) {
    return () => {
      if (!offer) {
        onCardEnterLeave();
        return;
      }

      onCardEnterLeave(offerToPoint(offer));
    };
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={handleMouseEnterLeave(offer)}
          onMouseLeave={handleMouseEnterLeave()}
        >
          <PlaceCard offer={offer} type={PlaceCardType.MAIN} />
        </div>
      ))}
    </div>
  );
}

export default PlaceList;
