import { AppThunk, RootState } from '..';
import { api, APIError, serializeAPIError } from '../../helpers/api';
import { LoadingStatus, ServerRoutes } from '../../helpers/enum';
import { Offer } from '../../types';

// Helpers

const groupOffersByCity = (offers: Offer[]) =>
  offers.reduce<Record<Offer['city']['name'], Offer[]>>((prevValue, curValue) => {
    if (!prevValue[curValue.city.name]) {
      prevValue[curValue.city.name] = [];
    }
    prevValue[curValue.city.name].push(curValue);
    return prevValue;
  }, {});

// State

type FavoritesState = {
  favoriteOffers: Offer[];
  loadingStatus: LoadingStatus;
  error: APIError | undefined;
};

const initialState: FavoritesState = {
  favoriteOffers: [],
  loadingStatus: LoadingStatus.IDLE,
  error: undefined,
};

// Reducer

enum ActionType {
  FAVORITE_OFFERS_LOADING = 'favorites/offersLoading',
  FAVORITE_OFFERS_LOADING_FAILED = 'favorites/offersLoadingFailed',
  FAVORITE_OFFERS_LOADING_SUCCEESSED = 'favorites/offersLoadingSucceessed',
  FAVORITE_OFFERS_UNMOUNTED = 'favorites/offersUnmounted',
}

export default function favoritesReducer(
  state = initialState,
  action: FavoritesActions,
): FavoritesState {
  switch (action.type) {
    case ActionType.FAVORITE_OFFERS_LOADING:
      return { ...state, loadingStatus: LoadingStatus.LOADING };
    case ActionType.FAVORITE_OFFERS_LOADING_FAILED:
      return { ...state, loadingStatus: LoadingStatus.FAILED, error: action.payload };
    case ActionType.FAVORITE_OFFERS_LOADING_SUCCEESSED:
      return { ...state, loadingStatus: LoadingStatus.SUCCEEDED, favoriteOffers: action.payload };
    case ActionType.FAVORITE_OFFERS_UNMOUNTED:
      return { ...state, loadingStatus: LoadingStatus.IDLE };
    default:
      return state;
  }
}

// Actions

export const favoriteOffersLoading = () => ({ type: ActionType.FAVORITE_OFFERS_LOADING } as const);
export const favoriteOffersLoadingFailed = (error: FavoritesState['error']) =>
  ({ type: ActionType.FAVORITE_OFFERS_LOADING_FAILED, payload: error } as const);
export const favoriteOffersLoadingSucceessed = (favoriteOffers: FavoritesState['favoriteOffers']) =>
  ({ type: ActionType.FAVORITE_OFFERS_LOADING_SUCCEESSED, payload: favoriteOffers } as const);

export const favoritesUnmounted = () => ({ type: ActionType.FAVORITE_OFFERS_UNMOUNTED } as const);

type FavoritesActions =
  | ReturnType<typeof favoriteOffersLoading>
  | ReturnType<typeof favoriteOffersLoadingFailed>
  | ReturnType<typeof favoriteOffersLoadingSucceessed>
  | ReturnType<typeof favoritesUnmounted>;

// Async actions

export function loadFavoriteOffers(): AppThunk {
  return async (dispatch) => {
    try {
      const { data: offers } = await api.get<Offer[]>(ServerRoutes.FAVORITE);
      dispatch(favoriteOffersLoadingSucceessed(offers));
    } catch (error) {
      dispatch(favoriteOffersLoadingFailed(serializeAPIError(error)));
    }
  };
}

// Selectors

export const favoriteOffersSelector = (state: RootState) => state.favorites.favoriteOffers;
export const favoriteOffersLoadingSelector = (state: RootState) => state.favorites.loadingStatus;
export const favoriteOffersLoadingErrorSelector = (state: RootState) => state.favorites.error;

export const areZeroFavoriteOffersSelector = (state: RootState) =>
  state.favorites.favoriteOffers.length === 0;

export const groupedFavoriteOffersSelector = (state: RootState) =>
  groupOffersByCity(state.favorites.favoriteOffers);
