import { useState } from 'react';
import classNames from 'classnames';

import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { SortType } from '../../helpers/enum';
import { sortTypeChanged, sortTypeSelector } from '../../store/slices/offers';

const options: Record<SortType, string> = {
  [SortType.DEFAULT]: 'Popular',
  [SortType.PRICE_LOW_TO_HIGH]: 'Price: low to high',
  [SortType.PRICE_HIGH_TO_LOW]: 'Price: high to low',
  [SortType.RATING_HIGH_TO_LOW]: 'Top rated first',
};

function PlacesSorting(): JSX.Element {
  const sortType = useTypedSelector(sortTypeSelector);
  const dispatch = useTypedDispatch();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownOpenerClick = () => setIsDropdownOpen((prevState) => !prevState);

  const handleDropdownClick = (newSortType: SortType) => () => {
    setIsDropdownOpen(false);
    if (newSortType === sortType) {
      return;
    }

    dispatch(sortTypeChanged(newSortType));
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleDropdownOpenerClick}>
        &nbsp;{options[sortType]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={classNames('places__options', 'places__options--custom', {
          'places__options--opened': isDropdownOpen,
        })}
      >
        {(Object.entries(options) as [SortType, string][]).map(([option, text]) => (
          <li
            key={option}
            className={classNames('places__option', {
              'places__option--active': sortType === option,
            })}
            tabIndex={0}
            onClick={handleDropdownClick(option)}
          >
            {text}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default PlacesSorting;
