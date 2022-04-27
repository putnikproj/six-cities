import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { Offer } from '../../types';
import { sortOffers } from '../../helpers/sort-offers';
import { CityName, PlaceCardType } from '../../helpers/enum';
import { setActiveOffer } from '../../store/action';

import PlaceCard from '../place-card';
import PlacesSorting from '../places-sorting';

type CitiesPlaceListProps = {
  activeCity: CityName;
  offers: Offer[];
};

function CitiesPlaceList({ offers, activeCity }: CitiesPlaceListProps): JSX.Element {
  const sortType = useTypedSelector((state) => state.sortType);
  const dispatch = useTypedDispatch();

  function handleMouseEnterLeave(offer?: Offer | undefined) {
    return () => {
      if (!offer) {
        dispatch(setActiveOffer(null));
        return;
      }

      dispatch(setActiveOffer(offer));
    };
  }

  return (
    <section className="cities__places places">
      {/* Title */}
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {`${offers.length} ${offers.length === 1 ? 'place' : 'places'}`} to stay in {activeCity}
      </b>

      {/* Sorting */}
      <PlacesSorting sortType={sortType} />

      {/* Places (offers) */}
      <div className="cities__places-list places__list tabs__content">
        {sortOffers(offers, sortType).map((offer) => (
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
