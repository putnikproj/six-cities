import { AppThunk, RootState } from '..';
import { api } from '../../helpers/api';
import { CityName, ServerRoutes, SortType } from '../../helpers/enum';
import { Offer } from '../../types';

// State

type OffersState = {
  offers: Offer[] | null;
  activeCity: CityName;
  sortType: SortType;
};

const initialState: OffersState = {
  offers: null,
  activeCity: CityName.PARIS,
  sortType: SortType.DEFAULT,
};

// Reducer

enum ActionType {
  SET_OFFERS = 'main/setOffers',
  SET_ACTIVE_CITY = 'main/setActiveCity',
  SET_SORT_TYPE = 'main/setSortType',
}

export default function offersReducer(state = initialState, action: OfferActions): OffersState {
  switch (action.type) {
    case ActionType.SET_OFFERS:
      return { ...state, offers: action.payload.offers };
    case ActionType.SET_ACTIVE_CITY:
      return { ...state, activeCity: action.payload.cityName };
    case ActionType.SET_SORT_TYPE:
      return { ...state, sortType: action.payload.sortType };
    default:
      return state;
  }
}

// Actions

export const setOffers = (offers: OffersState['offers']) =>
  ({
    type: ActionType.SET_OFFERS,
    payload: { offers },
  } as const);

export const setActiveCity = (cityName: OffersState['activeCity']) =>
  ({
    type: ActionType.SET_ACTIVE_CITY,
    payload: { cityName },
  } as const);

export const setSortType = (sortType: OffersState['sortType']) =>
  ({
    type: ActionType.SET_SORT_TYPE,
    payload: { sortType },
  } as const);

type OfferActions =
  | ReturnType<typeof setOffers>
  | ReturnType<typeof setActiveCity>
  | ReturnType<typeof setSortType>;

// Async actions

export function loadAllOffers(): AppThunk {
  return async (dispatch) => {
    const { data: allOffers } = await api.get<Offer[]>(ServerRoutes.OFFERS);
    dispatch(setOffers(allOffers));
  };
}

// Selectors

export const offersSelector = (state: RootState) => state.offers.offers;
export const activeCitySelector = (state: RootState) => state.offers.activeCity;
export const sortTypeSelector = (state: RootState) => state.offers.sortType;
