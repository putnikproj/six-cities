import { useState } from 'react';

import { city } from '../../mocks/city';
import { ActiveCity } from '../../types/city';
import { Offer } from '../../types/offer';
import { Point } from '../../types/point';
import { offerToPoint } from '../../util';

import CitiesPlaceList from '../cities-place-list/cities-place-list';
import Map from '../map/map';

type CitiesProps = {
  offers: Offer[],
  activeCity: ActiveCity,
};

function Cities({ offers, activeCity }: CitiesProps) {
  const [activePoint, setActivePoint] = useState<Point | undefined>();

  const handleCardEnterLeave = (point?: Point | undefined) => setActivePoint(point);

  if (offers.length === 0) {
    return (
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment in {activeCity}</p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        {/* left section */}
        <CitiesPlaceList offers={offers} onCardEnterLeave={handleCardEnterLeave} />

        {/* right section */}
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map
              city={city}
              points={offers.map((offer) => offerToPoint(offer))}
              activePoint={activePoint}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Cities;
