import camelcaseKeys from 'camelcase-keys';
import axios from 'axios';
import { toast } from 'react-toastify';

import { AppThunk } from '.';
import {
  setActiveOffer,
  setAreOffersLoaded,
  setAuthStatus,
  setAuthUser,
  setIsActiveOfferLoaded,
  setOffers,
} from './action';
import { AuthStatus, ResponseCodes, ServerRoutes } from '../helpers/enum';
import { AuthUserWithToken, Offer, UserLogin } from '../types';
import { setAuthToken } from '../helpers/auth-token';

// Offers

export function loadOffers(): AppThunk {
  return async (dispatch, getState, api) => {
    dispatch(setAreOffersLoaded(false));
    const { data } = await api.get(ServerRoutes.OFFERS);
    const offers = camelcaseKeys<Offer[]>(data, { deep: true });
    dispatch(setOffers(offers));
    dispatch(setAreOffersLoaded(true));
  };
}

export function loadOffer(id: Offer['id']): AppThunk {
  return async (dispatch, getState, api) => {
    dispatch(setActiveOffer(null));
    dispatch(setIsActiveOfferLoaded(false));
    try {
      const { data } = await api.get(`${ServerRoutes.OFFERS}g/${id}`);
      const offer = camelcaseKeys<Offer>(data, { deep: true });
      dispatch(setActiveOffer(offer));
      dispatch(setIsActiveOfferLoaded(true));
    } catch (err) {
      dispatch(setIsActiveOfferLoaded(true));
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
