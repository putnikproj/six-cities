import { useTypedDispatch } from '../../hooks';
import { Offer } from '../../types';
import { CityName, PlaceCardType } from '../../helpers/enum';
import { setActiveOffer } from '../../store/slices/active-offer';

import PlaceCard from '../place-card';
import PlacesSorting from '../places-sorting';

type CityPlacesListProps = {
  activeCity: CityName;
  offers: Offer[];
};

function CityPlacesList({ offers, activeCity }: CityPlacesListProps): JSX.Element {
  const dispatch = useTypedDispatch();

  const handleMouseEnterLeave = (offer: Offer | null) => () => dispatch(setActiveOffer(offer));

  return (
    <section className="cities__places places">
      {/* Title */}
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {`${offers.length} ${offers.length === 1 ? 'place' : 'places'}`} to stay in {activeCity}
      </b>

      {/* Sorting */}
      <PlacesSorting />

      {/* Offers */}
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            type={PlaceCardType.MAIN}
            onMouseEnterLeave={handleMouseEnterLeave}
          />
        ))}
      </div>
    </section>
  );
}

export default CityPlacesList;
