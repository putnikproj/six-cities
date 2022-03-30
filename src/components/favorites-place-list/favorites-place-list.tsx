import { Link } from 'react-router-dom';
import { PlaceCardType } from '../../const';

import { Offer } from '../../types/offer';

import PlaceCard from '../place-card/place-card';

type FavoritesPlaceCardProps = {
  offers: Offer[],
}

function FavoritesPlaceList({ offers }: FavoritesPlaceCardProps): JSX.Element {

  // This is needed to group cards by city.
  // This is a dictionary, where key is name of city and value is an array, where we push cards.
  type LocationItems = {
    [city: string]: JSX.Element[],
  };
  const locationItems: LocationItems = {};

  offers.forEach((offer) => {
    if (!locationItems[offer.city.name]) {
      locationItems[offer.city.name] = [];
    }

    locationItems[offer.city.name].push(<PlaceCard key={offer.id} offer={offer} type={PlaceCardType.FAVORITES} />);
  });

  return (
    <ul className="favorites__list">
      {
        Object.entries(locationItems).map(([city, cityOffers]) => (
          <li key={city} className="favorites__locations-items">

            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to="/">
                  <span>{city}</span>
                </Link>
              </div>
            </div>

            <div className="favorites__places">
              { cityOffers }
            </div>

          </li>
        ))
      }
    </ul>
  );
}

export default FavoritesPlaceList;
