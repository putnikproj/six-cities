import { Link } from 'react-router-dom';

import { PlaceCardType } from '../../helpers/enum';
import { useTypedSelector } from '../../hooks';
import { groupedFavoriteOffersSelector } from '../../store/slices/favorites';

import PlaceCard from '../place-card';

function FavoritesPlaceList(): JSX.Element {
  const groupedOffers = useTypedSelector(groupedFavoriteOffersSelector);

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {Object.values(groupedOffers).map((cityOffers) => {
          const cityName = cityOffers[0].city.name;

          return (
            <li key={cityName} className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <Link className="locations__item-link" to="/">
                    <span>{cityName}</span>
                  </Link>
                </div>
              </div>

              <div className="favorites__places">
                {cityOffers.map((offer) => (
                  <PlaceCard key={offer.id} offer={offer} type={PlaceCardType.FAVORITES} />
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default FavoritesPlaceList;
