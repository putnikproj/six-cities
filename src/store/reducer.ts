import { ActionType, CityName } from '../const';
import { State } from '../types/state';
import { ActionsType } from './action';

const initialState: State = {
  activeCity: CityName.AMSTERDAM,
  offers: [],
};

export function reducer(state = initialState, action: ActionsType) {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return { ...state, city: action.payload.cityName };
    case ActionType.ADD_CITY_OFFERS:
      return { ...state, offers: action.payload.offers };
    default:
      return state;
  }
}
