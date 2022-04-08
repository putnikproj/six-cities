import { ActionType } from '../const';
import { State } from '../types/state';

export const setActiveCity = (cityName: State['activeCity']) =>
  ({
    type: ActionType.SET_ACTIVE_CITY,
    payload: {
      cityName,
    },
  } as const);

export const setCityOffers = (offers: State['offers']) =>
  ({
    type: ActionType.SET_CITY_OFFERS,
    payload: {
      offers,
    },
  } as const);

export const setSortType = (sortType: State['sortType']) =>
  ({
    type: ActionType.SET_SORT_TYPE,
    payload: {
      sortType,
    },
  } as const);

export const setActiveOffer = (activeOffer: State['activeOffer']) =>
  ({
    type: ActionType.SET_ACTIVE_OFFER,
    payload: {
      activeOffer,
    },
  } as const);
