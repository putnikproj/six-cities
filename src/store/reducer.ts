import { ActionType, CityName } from '../const';
import { State } from '../types/state';
import { ActionsType } from './action';

const initialState: State = {
  activeCity: CityName.PARIS,
  offers: [],
};

export function reducer(state = initialState, action: ActionsType) {
  switch (action.type) {
    case ActionType.SET_ACTIVE_CITY:
      return { ...state, activeCity: action.payload.cityName };
    case ActionType.SET_CITY_OFFERS:
      return { ...state, offers: action.payload.offers };
    default:
      return state;
  }
}
