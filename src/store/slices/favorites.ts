import { AppThunk, RootState } from '..';
import { api } from '../../helpers/api';
import { ServerRoutes } from '../../helpers/enum';
import { Offer } from '../../types';

// State

type FavoritesState = {
  favoriteOffers: Offer[];
};

const initialState: FavoritesState = {
  favoriteOffers: [],
};

// Reducer

enum ActionType {
  SET_FAVORITE_OFFERS = 'favorites/setFavoriteOffers',
}

export default function favoritesReducer(
  state = initialState,
  action: FavoritesActions,
): FavoritesState {
  switch (action.type) {
    case ActionType.SET_FAVORITE_OFFERS:
      return { ...state, favoriteOffers: action.payload.favoriteOffers };
    default:
      return state;
  }
}

// Actions

export const setFavoriteOffers = (favoriteOffers: FavoritesState['favoriteOffers']) =>
  ({
    type: ActionType.SET_FAVORITE_OFFERS,
    payload: { favoriteOffers },
  } as const);

type FavoritesActions = ReturnType<typeof setFavoriteOffers>;

// Async actions

export function loadFavoriteOffers(): AppThunk {
  return async (dispatch) => {
    const { data: offers } = await api.get<Offer[]>(ServerRoutes.FAVORITE);
    dispatch(setFavoriteOffers(offers));
  };
}

// Selectors

export const favoriteOffersSelector = (state: RootState) => state.favorites.favoriteOffers;
