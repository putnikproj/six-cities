import { createSelector } from 'reselect';

import { AppThunk, RootState } from '..';
import { api, getErrorMessage } from '../../helpers/api';
import { CityName, LoadingStatus, ServerRoutes, SortType } from '../../helpers/enum';
import { sortOffers } from '../../helpers/sort-offers';
import { offerToPoint } from '../../helpers/util';
import { Offer } from '../../types';

// State

type OffersState = {
  offers: Offer[];
  loadingStatus: LoadingStatus;
  error: string | undefined;
  activeCity: CityName;
  sortType: SortType;
};

const initialState: OffersState = {
  offers: [],
  loadingStatus: LoadingStatus.IDLE,
  error: undefined,
  activeCity: CityName.PARIS,
  sortType: SortType.DEFAULT,
};

// Reducer

enum ActionType {
  OFFERS_LOADING = 'main/offersLoading',
  OFFERS_LOADING_FAILED = 'main/offersLoadingFailed',
  OFFERS_LOADING_SUCCEESSED = 'main/offersLoadingSucceessed',
  ACTIVE_CITY_CHANGED = 'main/activeCityChanged',
  SORT_TYPE_CHANGED = 'main/sortTypeChanged',
}

export default function offersReducer(state = initialState, action: OfferActions): OffersState {
  switch (action.type) {
    case ActionType.OFFERS_LOADING:
      return { ...state, loadingStatus: LoadingStatus.LOADING };
    case ActionType.OFFERS_LOADING_FAILED:
      return { ...state, loadingStatus: LoadingStatus.FAILED, error: action.payload };
    case ActionType.OFFERS_LOADING_SUCCEESSED:
      return { ...state, loadingStatus: LoadingStatus.SUCCEEDED, offers: action.payload };
    case ActionType.ACTIVE_CITY_CHANGED:
      return { ...state, activeCity: action.payload };
    case ActionType.SORT_TYPE_CHANGED:
      return { ...state, sortType: action.payload };
    default:
      return state;
  }
}

// Actions

export const offersLoading = () => ({ type: ActionType.OFFERS_LOADING } as const);
export const offersLoadingFailed = (error: OffersState['error']) =>
  ({ type: ActionType.OFFERS_LOADING_FAILED, payload: error } as const);
export const offersLoadingSucceessed = (offers: OffersState['offers']) =>
  ({ type: ActionType.OFFERS_LOADING_SUCCEESSED, payload: offers } as const);

export const activeCityChanged = (cityName: OffersState['activeCity']) =>
  ({ type: ActionType.ACTIVE_CITY_CHANGED, payload: cityName } as const);

export const sortTypeChanged = (sortType: OffersState['sortType']) =>
  ({ type: ActionType.SORT_TYPE_CHANGED, payload: sortType } as const);

type OfferActions =
  | ReturnType<typeof offersLoading>
  | ReturnType<typeof offersLoadingFailed>
  | ReturnType<typeof offersLoadingSucceessed>
  | ReturnType<typeof activeCityChanged>
  | ReturnType<typeof sortTypeChanged>;

// Async actions

export function loadAllOffers(): AppThunk {
  return async (dispatch) => {
    dispatch(offersLoading());
    try {
      const { data: allOffers } = await api.get<Offer[]>(ServerRoutes.OFFERS);
      dispatch(offersLoadingSucceessed(allOffers));
    } catch (error) {
      dispatch(offersLoadingFailed(getErrorMessage(error)));
    }
  };
}

// Selectors

export const allOffersSelector = (state: RootState) => state.offers.offers;
export const areZeroOffersSelector = (state: RootState) => state.offers.offers.length === 0;
export const activeCitySelector = (state: RootState) => state.offers.activeCity;
export const sortTypeSelector = (state: RootState) => state.offers.sortType;

export const offersLoadingStatusSelector = (state: RootState) => state.offers.loadingStatus;
export const offersLoadingErrorSelector = (state: RootState) => state.offers.error;

export const activeCityOffersSelector = createSelector(
  [allOffersSelector, activeCitySelector],
  (allOffers, activeCity) => allOffers.filter((offer) => offer.city.name === activeCity),
);

export const sortedActiveCityOffersSelector = createSelector(
  [activeCityOffersSelector, sortTypeSelector],
  (offers, sortType) => sortOffers(offers, sortType),
);

export const activeCityMapPointsSelector = createSelector([activeCityOffersSelector], (offers) =>
  offers.map((offer) => offerToPoint(offer)),
);
