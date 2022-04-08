import { SyntheticEvent } from 'react';
import classNames from 'classnames';

import { CityName } from '../../const';
import { ActiveCity } from '../../types/city';

type CitiesTabsProps = {
  activeCity: ActiveCity;
  onCityChange: (city: ActiveCity) => void;
};

function CitiesTabs({ activeCity, onCityChange }: CitiesTabsProps) {
  const handleLinkClick = (city: ActiveCity) => (evt: SyntheticEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    onCityChange(city);
  };

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {Object.values(CityName).map((city) => (
              <li key={city} className="locations__item">
                <a
                  onClick={handleLinkClick(city)}
                  className={classNames('locations__item-link', 'tabs__item', {
                    'tabs__item--active': activeCity === city,
                  })}
                  href="/"
                >
                  <span>{city}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default CitiesTabs;
