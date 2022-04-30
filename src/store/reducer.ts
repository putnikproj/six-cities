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
  nearbyOffers: Offer[];
  nearbyOffersLoadStatus: LoadStatus;
  reviews: Review[];
  reviewsLoadStatus: LoadStatus;
  favoriteOffers: Offer[];
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
  nearbyOffers: [],
  nearbyOffersLoadStatus: LoadStatus.UNLOADED,
  reviews: [],
  reviewsLoadStatus: LoadStatus.UNLOADED,
  favoriteOffers: [],
  authStatus: AuthStatus.UNKNOWN,
  authUser: null,
};

// Reducer

// Automatically returns union of all actions that the app has. Used for typing reducer
export type Actions = ReturnType<InferValueTypes<typeof actions>>;

export enum ActionType {
  SET_OFFERS = 'main/setOffers',
  SET_OFFERS_LOAD_STATUS = 'main/setOffersLoadStatus',
  SET_SORT_TYPE = 'main/setSortType',
  SET_ACTIVE_OFFER = 'main/setActiveOffer',
  SET_ACTIVE_CITY = 'offer/setActiveCity',
  SET_ACTIVE_OFFER_LOAD_STATUS = 'offer/setActiveOfferLoadStatus',
  SET_NEARBY_OFFERS = 'offer/setNearbyOffers',
  SET_NEARBY_OFFERS_LOAD_STATUS = 'offer/setNearbyOffersLoadStatus',
  SET_REVIEWS = 'offer/setReviews',
  SET_REVIEWS_LOAD_STATUS = 'offer/setReviewsLoadStatus',
  SET_FAVORITE_OFFERS = 'favorites/setFavoriteOffers',
  SET_AUTH_STATUS = 'user/setAuthStatus',
  SET_AUTH_USER = 'user/setAuthUser',
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
    case ActionType.SET_NEARBY_OFFERS:
      return { ...state, nearbyOffers: action.payload.nearbyOffers };
    case ActionType.SET_FAVORITE_OFFERS:
      return { ...state, favoriteOffers: action.payload.favoriteOffers };
    case ActionType.SET_NEARBY_OFFERS_LOAD_STATUS:
      return { ...state, nearbyOffersLoadStatus: action.payload.nearbyOffersLoadStatus };
    case ActionType.SET_AUTH_STATUS:
      return { ...state, authStatus: action.payload.authStatus };
    case ActionType.SET_AUTH_USER:
      return { ...state, authUser: action.payload.authUser };
    case ActionType.SET_REVIEWS:
      return { ...state, reviews: action.payload.reviews };
    case ActionType.SET_REVIEWS_LOAD_STATUS:
      return { ...state, reviewsLoadStatus: action.payload.reviewsLoadStatus };
    default:
      return state;
  }
}
