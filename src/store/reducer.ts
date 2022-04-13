import { ActionType, CityName, SortType } from '../helpers/const';
import { State } from '../types/state';
import { ActionsType } from '../types/store';

const initialState: State = {
  activeCity: CityName.PARIS,
  offers: [],
  sortType: SortType.DEFAULT,
  activeOffer: null,
  reviews: [],
};

export function reducer(state = initialState, action: ActionsType): State {
  switch (action.type) {
    case ActionType.SET_ACTIVE_CITY:
      return { ...state, activeCity: action.payload.cityName };
    case ActionType.SET_CITY_OFFERS:
      return { ...state, offers: action.payload.offers };
    case ActionType.SET_SORT_TYPE:
      return { ...state, sortType: action.payload.sortType };
    case ActionType.SET_ACTIVE_OFFER:
      return { ...state, activeOffer: action.payload.activeOffer };
    case ActionType.LOAD_REVIEWS:
      return { ...state, reviews: action.payload.reviews };
    default:
      return state;
  }
}
