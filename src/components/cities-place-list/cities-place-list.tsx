// import { useState } from 'react';
import { Offers } from '../../types/offer';

import CitiesPlaceCard from '../cities-place-card/cities-place-card';

type PlaceListProps = {
  offers: Offers,
};

function PlaceList({ offers }: PlaceListProps): JSX.Element  {
  // const [activeCard, setActiveCard] = useState(offers[0].id);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <CitiesPlaceCard key={offer.id} offer={offer} />)}
    </div>
  );
}

export default PlaceList;
