import camelcaseKeys from 'camelcase-keys';
import axios from 'axios';
import { toast } from 'react-toastify';

import { AppThunk } from '.';
import { setAreOffersLoaded, setAuthStatus, setAuthUser, setOffers } from './action';
import { AuthStatus, ResponseCodes, ServerRoutes } from '../helpers/enum';
import { AuthUser, Offer } from '../types';
import { setAuthToken, AuthToken } from '../helpers/auth-token';

export function loadOffers(): AppThunk {
  return async (dispatch, getState, api) => {
    const { data } = await api.get(ServerRoutes.OFFERS);
    const offers = camelcaseKeys<Offer[]>(data, { deep: true });
    dispatch(setOffers(offers));
    dispatch(setAreOffersLoaded(true));
  };
}

export function checkAuth(): AppThunk {
  return async (dispatch, getState, api) => {
    try {
      await api.get(ServerRoutes.LOGIN);
      dispatch(setAuthStatus(AuthStatus.AUTH));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === ResponseCodes.UNAUTHORIZED) {
          toast.warn('You are not authorised');
          dispatch(setAuthStatus(AuthStatus.UNAUTH));
          return;
        }

        toast.error(e.message);
      }
    }
  };
}

export function login(email: string, password: string): AppThunk {
  return async (dispatch, getState, api) => {
    try {
      const { status, data } = await api.post(ServerRoutes.LOGIN, {
        email,
        password,
      });

      if (status === ResponseCodes.OK) {
        const { token, ...authUser } = camelcaseKeys<AuthUser & { token: AuthToken }>(data, {
          deep: true,
        });

        setAuthToken(token);
        dispatch(setAuthStatus(AuthStatus.AUTH));
        dispatch(setAuthUser(authUser));
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.message);
      }
    }
  };
}
