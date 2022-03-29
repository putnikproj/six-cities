import { Link } from 'react-router-dom';

import { Cities } from '../../const';

function CitiesTabs() {
  const activeCity = Cities.AMSTERDAM;

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">

            {Object.values(Cities).map((city) => (
              <li key={city} className="locations__item">
                <Link className={`locations__item-link tabs__item ${activeCity === city && 'tabs__item--active'}`} to="/">
                  <span>{city}</span>
                </Link>
              </li>
            ))}

          </ul>
        </section>
      </div>
    </>
  );
}

export default CitiesTabs;
