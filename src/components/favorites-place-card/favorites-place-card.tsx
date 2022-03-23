import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offer';

import PlaceCard from '../place-card/place-card';

type FavoritesPlaceCardProps = {
  offer: Offer,
};

function FavoritesPlaceCard({ offer }: FavoritesPlaceCardProps): JSX.Element {
  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.OFFER}/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place" />
        </Link>
      </div>

      <PlaceCard className="favorites__card-info place-card__info" offer={offer} />
    </article>
  );
}

export default FavoritesPlaceCard;
