import { State, ActionType } from './reducer';

export const setActiveCity = (cityName: State['activeCity']) =>
  ({
    type: ActionType.SET_ACTIVE_CITY,
    payload: { cityName },
  } as const);

export const setOffers = (offers: State['offers']) =>
  ({
    type: ActionType.SET_OFFERS,
    payload: { offers },
  } as const);

export const setOffersLoadStatus = (offersLoadStatus: State['offersLoadStatus']) =>
  ({
    type: ActionType.SET_OFFERS_LOAD_STATUS,
    payload: { offersLoadStatus },
  } as const);

export const setSortType = (sortType: State['sortType']) =>
  ({
    type: ActionType.SET_SORT_TYPE,
    payload: { sortType },
  } as const);

export const setActiveOffer = (activeOffer: State['activeOffer']) =>
  ({
    type: ActionType.SET_ACTIVE_OFFER,
    payload: { activeOffer },
  } as const);

export const setActiveOfferLoadStatus = (activeOfferLoadStatus: State['activeOfferLoadStatus']) =>
  ({
    type: ActionType.SET_ACTIVE_OFFER_LOAD_STATUS,
    payload: { activeOfferLoadStatus },
  } as const);

export const setNearbyOffers = (nearbyOffers: State['nearbyOffers']) =>
  ({
    type: ActionType.SET_NEARBY_OFFERS,
    payload: { nearbyOffers },
  } as const);

export const setNearbyOffersLoadStatus = (
  nearbyOffersLoadStatus: State['nearbyOffersLoadStatus'],
) =>
  ({
    type: ActionType.SET_NEARBY_OFFERS_LOAD_STATUS,
    payload: { nearbyOffersLoadStatus },
  } as const);

export const setAuthStatus = (authStatus: State['authStatus']) =>
  ({
    type: ActionType.SET_AUTH_STATUS,
    payload: { authStatus },
  } as const);

export const setAuthUser = (authUser: State['authUser']) =>
  ({
    type: ActionType.SET_AUTH_USER,
    payload: { authUser },
  } as const);

export const setReviews = (reviews: State['reviews']) =>
  ({
    type: ActionType.SET_REVIEWS,
    payload: { reviews },
  } as const);

export const setReviewsLoadStatus = (reviewsLoadStatus: State['reviewsLoadStatus']) =>
  ({
    type: ActionType.SET_REVIEWS_LOAD_STATUS,
    payload: { reviewsLoadStatus },
  } as const);
