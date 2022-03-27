// import { useState } from 'react';

import { Offers } from '../../types/offer';
import { PlaceCardType } from '../../const';

import PlaceCard from '../place-card/place-card';

type CitiesPlaceListProps = {
  offers: Offers,
};
function PlaceList({ offers }: CitiesPlaceListProps): JSX.Element  {
  // const [activeCard, setActiveCard] = useState(offers[0].id);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <PlaceCard key={offer.id} offer={offer} type={PlaceCardType.MAIN} />)}
    </div>
  );
}

export default PlaceList;
