import { toast } from 'react-toastify';
import { AppThunk, RootState } from '..';
import { api, APIError, serializeAPIError } from '../../helpers/api';
import { CityName, LoadingStatus, ServerRoutes } from '../../helpers/enum';
import { Offer } from '../../types';

// Helpers

const groupOffersByCity = (offers: Offer[]) => {
  const groupedOffers: Record<string, Offer[]> = {};
  Object.values(CityName).forEach((city) => (groupedOffers[city] = []));

  return offers.reduce<typeof groupedOffers>((prevValue, curValue) => {
    groupedOffers[curValue.city.name].push(curValue);
    return prevValue;
  }, groupedOffers);
};

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
  REMOVED_FROM_FAVORITES = 'favorites/removedFromFavorites',
  ADDED_TO_FAVORITES = 'favorites/addedToFavorites',
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
    case ActionType.REMOVED_FROM_FAVORITES:
      return {
        ...state,
        favoriteOffers: state.favoriteOffers.filter((offer) => offer.id !== action.payload.id),
      };
    case ActionType.ADDED_TO_FAVORITES:
      return {
        ...state,
        favoriteOffers: [...state.favoriteOffers, action.payload],
      };
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

export const removedFromFavorites = (offer: Offer) =>
  ({ type: ActionType.REMOVED_FROM_FAVORITES, payload: offer } as const);
export const addedToFavorites = (offer: Offer) =>
  ({ type: ActionType.ADDED_TO_FAVORITES, payload: offer } as const);

type FavoritesActions =
  | ReturnType<typeof favoriteOffersLoading>
  | ReturnType<typeof favoriteOffersLoadingFailed>
  | ReturnType<typeof favoriteOffersLoadingSucceessed>
  | ReturnType<typeof favoritesUnmounted>
  | ReturnType<typeof removedFromFavorites>
  | ReturnType<typeof addedToFavorites>;

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

export function removeOfferFromFavorites(offer: Offer): AppThunk {
  return async (dispatch) => {
    try {
      dispatch(removedFromFavorites(offer));
      await api.post<Offer>(`${ServerRoutes.FAVORITE}/${offer.id}/0`);
    } catch (error) {
      const errorMessage = serializeAPIError(error).message;
      toast.error(`Offer was not removed from favorites: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  };
}

export function addOfferToFavorites(offer: Offer): AppThunk {
  return async (dispatch) => {
    try {
      const { data: updatedPost } = await api.post<Offer>(`${ServerRoutes.FAVORITE}/${offer.id}/1`);
      dispatch(addedToFavorites(updatedPost));
    } catch (error) {
      const errorMessage = serializeAPIError(error).message;
      toast.error(`Offer was not added to favorites: ${errorMessage}`);
      throw new Error(errorMessage);
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
