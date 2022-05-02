import { toast } from 'react-toastify';

import { AppThunk } from '.';
import {
  setActiveOffer,
  setAuthStatus,
  setAuthUser,
  setFavoriteOffers,
  setNearbyOffers,
  setOffers,
  setReviews,
} from './action';
import { AuthStatus, ResponseCodes, ServerRoutes } from '../helpers/enum';
import { AuthUserWithToken, NewReview, Offer, Review, UserLogin } from '../types';
import { clearAuthToken, setAuthToken } from '../helpers/auth-token';
import { handleAPIError } from '../helpers/api';

// To test: await new Promise((resolve) => setTimeout(resolve, 5000));

// Offers

export function loadAllOffers(): AppThunk {
  return async (dispatch, getState, api) => {
    const { data: allOffers } = await api.get<Offer[]>(ServerRoutes.OFFERS);
    dispatch(setOffers(allOffers));
  };
}

export function loadOffer(id: Offer['id']): AppThunk {
  return async (dispatch, getState, api) => {
    const { data: offer } = await api.get<Offer>(`${ServerRoutes.OFFERS}/${id}`);
    dispatch(setActiveOffer(offer));
  };
}

export function loadNearbyOffers(id: Offer['id']): AppThunk {
  return async (dispatch, getState, api) => {
    const { data: nearbyOffers } = await api.get<Offer[]>(`${ServerRoutes.OFFERS}/${id}/nearby`);
    dispatch(setNearbyOffers(nearbyOffers));
  };
}

export function loadFavoriteOffers(): AppThunk {
  return async (dispatch, getState, api) => {
    const { data: offers } = await api.get<Offer[]>(ServerRoutes.FAVORITE);
    dispatch(setFavoriteOffers(offers));
  };
}

// Offer reviews

export function loadReviews(id: Offer['id']): AppThunk {
  return async (dispatch, getState, api) => {
    const { data: reviews } = await api.get<Review[]>(`${ServerRoutes.REVIEWS}/${id}`);
    dispatch(setReviews(reviews));
  };
}

export function uploadReview(id: Offer['id'], review: NewReview): AppThunk {
  return async (dispatch, getState, api) => {
    const { data: offerReviews } = await api.post<Review[]>(
      `${ServerRoutes.REVIEWS}/${id}`,
      review,
    );

    dispatch(setReviews(offerReviews));
  };
}

// Auth

export function checkAuth(): AppThunk {
  return async (dispatch, getState, api) => {
    try {
      const {
        data: { token, ...authUser },
      } = await api.get<AuthUserWithToken>(ServerRoutes.LOGIN);

      dispatch(setAuthStatus(AuthStatus.AUTH));
      dispatch(setAuthUser(authUser));
    } catch (err) {
      dispatch(setAuthStatus(AuthStatus.UNAUTH));
      handleAPIError(err, (axiosError) => {
        switch (axiosError.response?.status) {
          case ResponseCodes.UNAUTHORIZED:
            toast.warn('You are not authorised');
            return;
          default:
            toast.error(axiosError.message);
        }
      });
    }
  };
}

export function login({ email, password }: UserLogin): AppThunk {
  return async (dispatch, getState, api) => {
    const {
      data: { token, ...authUser },
    } = await api.post<AuthUserWithToken>(ServerRoutes.LOGIN, { email, password });

    setAuthToken(token);
    dispatch(setAuthStatus(AuthStatus.AUTH));
    dispatch(setAuthUser(authUser));
  };
}

export function logout(): AppThunk {
  return async (dispatch, getState, api) => {
    await api.delete(ServerRoutes.LOGOUT);

    clearAuthToken();
    dispatch(setAuthStatus(AuthStatus.UNAUTH));
    dispatch(setAuthUser(null));
  };
}
