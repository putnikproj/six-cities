import { Offer } from '../../types/offer';
import { Point } from '../../types/point';
import { PlaceCardType } from '../../const';
import { offerToPoint } from '../../util';

import PlaceCard from '../place-card/place-card';
import PlacesSorting from '../places-sorting/places-sorting';

type CitiesPlaceListProps = {
  offers: Offer[],
  onCardEnterLeave: (point?: Point | undefined) => void,
};

function CitiesPlaceList({ offers, onCardEnterLeave }: CitiesPlaceListProps): JSX.Element  {

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
    <section className="cities__places places">
      {/* Title */}
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{`${offers.length} ${offers.length === 1 ? 'place' : 'places'}`} to stay in Amsterdam</b>

      {/* Sorting */}
      <PlacesSorting />

      {/* Places (offers) */}
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
    </section>
  );
}

export default CitiesPlaceList;
