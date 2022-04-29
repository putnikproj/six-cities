import { AuthStatus, CityName, LoadStatus, SortType } from '../helpers/enum';
import { Offer, Review, InferValueTypes, AuthUser } from '../types';
import * as actions from './action';

// Default state

export type State = {
  activeCity: CityName;
  offers: Offer[];
  offersLoadStatus: LoadStatus;
  sortType: SortType;
  activeOffer: Offer | null;
  activeOfferLoadStatus: LoadStatus;
  reviews: Review[];
  authStatus: AuthStatus;
  authUser: AuthUser | null;
};

const initialState: State = {
  activeCity: CityName.PARIS,
  offers: [],
  offersLoadStatus: LoadStatus.UNLOADED,
  sortType: SortType.DEFAULT,
  activeOffer: null,
  activeOfferLoadStatus: LoadStatus.UNLOADED,
  reviews: [],
  authStatus: AuthStatus.UNKNOWN,
  authUser: null,
};

// Reducer

// Automatically returns union of all actions that the app has. Used for typing reducer
export type Actions = ReturnType<InferValueTypes<typeof actions>>;

export enum ActionType {
  SET_ACTIVE_CITY = 'main/setActiveCity',
  SET_OFFERS = 'main/setOffers',
  SET_OFFERS_LOAD_STATUS = 'main/setOffersLoadStatus',
  SET_SORT_TYPE = 'main/setSortType',
  SET_ACTIVE_OFFER = 'main/setActiveOffer',
  SET_ACTIVE_OFFER_LOAD_STATUS = 'offer/setActiveOfferLoadStatus',
  SET_AUTH_STATUS = 'user/setAuthStatus',
  SET_AUTH_USER = 'user/setAuthUser',
  LOAD_REVIEWS = 'server/loadReviews',
}

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionType.SET_ACTIVE_CITY:
      return { ...state, activeCity: action.payload.cityName };
    case ActionType.SET_OFFERS:
      return { ...state, offers: action.payload.offers };
    case ActionType.SET_OFFERS_LOAD_STATUS:
      return { ...state, offersLoadStatus: action.payload.offersLoadStatus };
    case ActionType.SET_SORT_TYPE:
      return { ...state, sortType: action.payload.sortType };
    case ActionType.SET_ACTIVE_OFFER:
      return { ...state, activeOffer: action.payload.activeOffer };
    case ActionType.SET_ACTIVE_OFFER_LOAD_STATUS:
      return { ...state, activeOfferLoadStatus: action.payload.activeOfferLoadStatus };
    case ActionType.SET_AUTH_STATUS:
      return { ...state, authStatus: action.payload.authStatus };
    case ActionType.SET_AUTH_USER:
      return { ...state, authUser: action.payload.authUser };
    case ActionType.LOAD_REVIEWS:
      return { ...state, reviews: action.payload.reviews };
    default:
      return state;
  }
}
