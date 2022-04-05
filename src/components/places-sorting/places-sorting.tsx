import { useState } from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import classNames from 'classnames';

import { SortType } from '../../const';
import { OfferSort } from '../../types/offer';
import { State } from '../../types/state';
import { ActionsType, setSortType } from '../../store/action';

const options = {
  [SortType.DEFAULT]: 'Popular',
  [SortType.PRICE_LOW_TO_HIGH]: 'Price: low to high',
  [SortType.PRICE_HIGH_TO_LOW]: 'Price: high to low',
  [SortType.RATING_HIGH_TO_LOW]: 'Top rated first',
};

function mapStateToProps(state: State) {
  return {
    sortType: state.sortType,
  };
}

function mapDispatchToProps(dispatch: Dispatch<ActionsType>) {
  return {
    changeSortType(sortType: State['sortType']) {
      dispatch(setSortType({ sortType }));
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type PlacesSortingProps = PropsFromRedux;

function PlacesSorting({ sortType, changeSortType }: PlacesSortingProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownOpenerClick = () => setIsDropdownOpen((prevState) => !prevState);

  const handleDropdownClick = (newSortType: OfferSort) => () => {
    setIsDropdownOpen(false);
    if (newSortType === sortType) {
      return;
    }

    changeSortType(newSortType);
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
        className={classNames(
          'places__options',
          'places__options--custom',
          { 'places__options--opened': isDropdownOpen },
        )}
      >
        {Object.entries(options).map(([option, text]) => (
          <li
            key={option}
            className={classNames(
              'places__option',
              { 'places__option--active': sortType === option },
            )}
            tabIndex={0}
            onClick={handleDropdownClick(option as OfferSort)}
          >
            { text }
          </li>
        ))}
      </ul>
    </form>
  );
}

export default connector(PlacesSorting);
