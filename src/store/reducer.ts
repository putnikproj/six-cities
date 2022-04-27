import { CityName, SortType } from '../helpers/enum';
import { Offer, Review, InferValueTypes } from '../types';
import * as actions from './action';

// Default state

export type State = {
  activeCity: CityName;
  offers: Offer[];
  sortType: SortType;
  activeOffer: Offer | null;
  reviews: Review[];
};

const initialState: State = {
  activeCity: CityName.PARIS,
  offers: [],
  sortType: SortType.DEFAULT,
  activeOffer: null,
  reviews: [],
};

// Reducer

// Automatically returns union of all actions that the app has. Used for typing reducer
type Actions = ReturnType<InferValueTypes<typeof actions>>;

export enum ActionType {
  SET_ACTIVE_CITY = 'main/setActiveCity',
  SET_CITY_OFFERS = 'main/setCityOffers',
  SET_SORT_TYPE = 'main/setSortType',
  SET_ACTIVE_OFFER = 'main/setActiveOffer',
  LOAD_REVIEWS = 'offer/loadReviews',
}

export function reducer(state = initialState, action: Actions): State {
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
