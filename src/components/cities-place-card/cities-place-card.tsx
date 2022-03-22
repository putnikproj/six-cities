import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offer';

import PlaceCard from '../place-card/place-card';

type CitiesPlaceCardProps = {
  offer: Offer,
}

function CitiesPlaceCard({ offer }: CitiesPlaceCardProps): JSX.Element {
  return (
    <article className="cities__place-card place-card">
      {offer.isPremium
        ? <div className="place-card__mark"><span>Premium</span></div>
        : '' }

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={AppRoute.OFFER}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place" />
        </Link>
      </div>

      <PlaceCard className="place-card__info" offer={offer} />
    </article>
  );
}

export default CitiesPlaceCard;
