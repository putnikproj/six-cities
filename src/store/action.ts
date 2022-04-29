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

export const setAreOffersLoaded = (areOffersLoaded: State['areOffersLoaded']) =>
  ({
    type: ActionType.SET_ARE_OFFERS_LOADED,
    payload: { areOffersLoaded },
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

export const setIsActiveOfferLoaded = (isActiveOfferLoaded: State['isActiveOfferLoaded']) =>
  ({
    type: ActionType.SET_IS_ACTIVE_OFFER_LOADED,
    payload: { isActiveOfferLoaded },
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

export const loadReviews = (reviews: State['reviews']) =>
  ({
    type: ActionType.LOAD_REVIEWS,
    payload: { reviews },
  } as const);
