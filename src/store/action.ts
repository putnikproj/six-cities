import { ActionType } from '../const';
import { Offer } from '../types/offer';
import { State } from '../types/state';

export const setActiveCity = (payload: { cityName: State['activeCity'] }) => ({
  type: ActionType.SET_ACTIVE_CITY,
  payload,
} as const);

export const setCityOffers = (payload: { offers: Offer[] }) => ({
  type: ActionType.SET_CITY_OFFERS,
  payload,
} as const);

export type ActionsType =
  | ReturnType<typeof setActiveCity>
  | ReturnType<typeof setCityOffers>;
