import camelcaseKeys from 'camelcase-keys';
import axios from 'axios';
import { toast } from 'react-toastify';

import { AppThunk } from '.';
import {
  setActiveOffer,
  setActiveOfferLoadStatus,
  setAuthStatus,
  setAuthUser,
  setOffers,
  setOffersLoadStatus,
} from './action';
import { AuthStatus, LoadStatus, ResponseCodes, ServerRoutes } from '../helpers/enum';
import { AuthUserWithToken, Offer, UserLogin } from '../types';
import { clearAuthToken, setAuthToken } from '../helpers/auth-token';

// Offers

export function loadOffers(): AppThunk {
  return async (dispatch, getState, api) => {
    dispatch(setOffersLoadStatus(LoadStatus.LOADING));
    try {
      const { data } = await api.get(ServerRoutes.OFFERS);
      const offers = camelcaseKeys<Offer[]>(data, { deep: true });
      dispatch(setOffers(offers));
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
      const { data } = await api.get(`${ServerRoutes.OFFERS}/${id}`);
      const offer = camelcaseKeys<Offer>(data, { deep: true });
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

// Auth

export function checkAuth(): AppThunk {
  return async (dispatch, getState, api) => {
    try {
      const { data } = await api.get(ServerRoutes.LOGIN);

      const { token, ...authUser } = camelcaseKeys<AuthUserWithToken>(data, {
        deep: true,
      });

      dispatch(setAuthStatus(AuthStatus.AUTH));
      dispatch(setAuthUser(authUser));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === ResponseCodes.UNAUTHORIZED) {
          toast.warn('You are not authorised');
          dispatch(setAuthStatus(AuthStatus.UNAUTH));
          return;
        }

        toast.error(err.message);
      }
    }
  };
}

export function login({ email, password }: UserLogin): AppThunk {
  return async (dispatch, getState, api) => {
    try {
      const { data } = await api.post(ServerRoutes.LOGIN, {
        email,
        password,
      });

      const { token, ...authUser } = camelcaseKeys<AuthUserWithToken>(data, {
        deep: true,
      });

      setAuthToken(token);
      dispatch(setAuthStatus(AuthStatus.AUTH));
      dispatch(setAuthUser(authUser));

      toast.success('You are authorized');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.message);
      }
    }
  };
}

export function logout(): AppThunk {
  return async (dispatch, getState, api) => {
    try {
      await api.delete(ServerRoutes.LOGOUT);

      clearAuthToken();
      dispatch(setAuthStatus(AuthStatus.UNAUTH));
      dispatch(setAuthUser(null));

      toast.success('You are logged out');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.message);
      }
    }
  };
}
