import axios from 'axios';
import { toast } from 'react-toastify';

import { AppThunk } from '.';
import {
  setActiveOffer,
  setActiveOfferLoadStatus,
  setAuthStatus,
  setAuthUser,
  setFavoriteOffers,
  setNearbyOffers,
  setNearbyOffersLoadStatus,
  setOffers,
  setOffersLoadStatus,
  setReviews,
  setReviewsLoadStatus,
} from './action';
import { AuthStatus, LoadStatus, ResponseCodes, ServerRoutes } from '../helpers/enum';
import { AuthUserWithToken, NewReview, Offer, Review, UserLogin } from '../types';
import { clearAuthToken, setAuthToken } from '../helpers/auth-token';

// To test: await new Promise((resolve) => setTimeout(resolve, 5000));

// Offers

export function loadOffers(): AppThunk {
  return async (dispatch, getState, api) => {
    dispatch(setOffersLoadStatus(LoadStatus.LOADING));
    try {
      const { data: allOffers } = await api.get<Offer[]>(ServerRoutes.OFFERS);

      dispatch(setOffers(allOffers));
      dispatch(setOffersLoadStatus(LoadStatus.LOADED));
    } catch (err) {
      dispatch(setOffersLoadStatus(LoadStatus.ERROR));
      if (axios.isAxiosError(err)) {
        toast.error(err.message);
      }
    }
  };
}

export function loadOffer(id: Offer['id']): AppThunk {
  return async (dispatch, getState, api) => {
    dispatch(setActiveOfferLoadStatus(LoadStatus.LOADING));
    try {
      const { data: offer } = await api.get<Offer>(`${ServerRoutes.OFFERS}/${id}`);

      dispatch(setActiveOffer(offer));
      dispatch(setActiveOfferLoadStatus(LoadStatus.LOADED));
    } catch (err) {
      dispatch(setActiveOfferLoadStatus(LoadStatus.ERROR));
      if (axios.isAxiosError(err)) {
        toast.error(err.message);
      }
    }
  };
}

export function loadNearbyOffers(id: Offer['id']): AppThunk {
  return async (dispatch, getState, api) => {
    dispatch(setNearbyOffersLoadStatus(LoadStatus.LOADING));
    try {
      const { data: nearbyOffers } = await api.get<Offer[]>(`${ServerRoutes.OFFERS}/${id}/nearby`);

      dispatch(setNearbyOffers(nearbyOffers));
      dispatch(setNearbyOffersLoadStatus(LoadStatus.LOADED));
    } catch (err) {
      dispatch(setNearbyOffersLoadStatus(LoadStatus.ERROR));
      if (axios.isAxiosError(err)) {
        toast.error(err.message);
      }
    }
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
    dispatch(setReviewsLoadStatus(LoadStatus.LOADING));
    try {
      const { data: reviews } = await api.get<Review[]>(`${ServerRoutes.REVIEWS}/${id}`);

      dispatch(setReviews(reviews));
      dispatch(setReviewsLoadStatus(LoadStatus.LOADED));
    } catch (err) {
      dispatch(setReviewsLoadStatus(LoadStatus.ERROR));
      if (axios.isAxiosError(err)) {
        toast.error(err.message);
      }
    }
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

      if (!axios.isAxiosError(err)) {
        return;
      }

      switch (err.response?.status) {
        case ResponseCodes.UNAUTHORIZED:
          toast.warn('You are not authorised');
          return;
        default:
          toast.error(err.message);
      }
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
