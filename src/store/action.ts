import { ActionType } from '../const';
import { Offer } from '../types/offer';
import { State } from '../types/state';

export const changeCity = (cityName: State['activeCity']) => ({
  type: ActionType.CHANGE_CITY,
  payload: {
    cityName,
  },
} as const);

export const addCityOffers = (offers: Offer[]) => ({
  type: ActionType.ADD_CITY_OFFERS,
  payload: {
    offers,
  },
} as const);

export type ActionsType =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof addCityOffers>;
