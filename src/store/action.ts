import { ActionType } from '../const';
import { State } from '../types/state';

export const setActiveCity = (payload: { cityName: State['activeCity'] }) => ({
  type: ActionType.SET_ACTIVE_CITY,
  payload,
} as const);

export const setCityOffers = (payload: { offers: State['offers'] }) => ({
  type: ActionType.SET_CITY_OFFERS,
  payload,
} as const);

export const setSortType = (payload: { sortType: State['sortType'] }) => ({
  type: ActionType.SET_SORT_TYPE,
  payload,
} as const);

export const setActiveOffer = (payload: { activeOffer: State['activeOffer'] }) => ({
  type: ActionType.SET_ACTIVE_OFFER,
  payload,
} as const);

export type ActionsType =
  | ReturnType<typeof setActiveCity>
  | ReturnType<typeof setCityOffers>
  | ReturnType<typeof setSortType>
  | ReturnType<typeof setActiveOffer>;
