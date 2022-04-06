import { ActionType, CityName, SortType } from '../const';
import { sortOffers } from '../sort-offers';
import { State } from '../types/state';
import { ActionsType } from './action';

const initialState: State = {
  activeCity: CityName.PARIS,
  offers: [],
  sortType: SortType.DEFAULT,
  activeOffer: null,
};

export function reducer(state = initialState, action: ActionsType) {
  switch (action.type) {
    case ActionType.SET_ACTIVE_CITY:
      return { ...state, activeCity: action.payload.cityName };
    case ActionType.SET_CITY_OFFERS:
      return { ...state, offers: sortOffers(action.payload.offers, state.sortType) };
    case ActionType.SET_SORT_TYPE:
      return { ...state, sortType: action.payload.sortType, offers: sortOffers(state.offers, action.payload.sortType) };
    case ActionType.SET_ACTIVE_OFFER:
      return { ...state, activeOffer: action.payload.activeOffer };
    default:
      return state;
  }
}
