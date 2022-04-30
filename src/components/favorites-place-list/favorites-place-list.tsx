import { Link } from 'react-router-dom';

import { CityName, PlaceCardType } from '../../helpers/enum';
import { Offer } from '../../types';

import PlaceCard from '../place-card';

type FavoritesPlaceListProps = {
  offers: Offer[];
};

function FavoritesPlaceList({ offers }: FavoritesPlaceListProps): JSX.Element {
  return (
    <ul className="favorites__list">
      {Object.values(CityName).map((city) => {
        const cityOffers = offers.filter((offer) => offer.city.name === city);

        if (cityOffers.length === 0) {
          return null;
        }

        return (
          <li key={city} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to="/">
                  <span>{city}</span>
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
  );
}

export default FavoritesPlaceList;
