import camelcaseKeys from 'camelcase-keys';
import axios from 'axios';
import { toast } from 'react-toastify';

import { AppThunk } from '.';
import { setAreOffersLoaded, setAuthStatus, setAuthUser, setOffers } from './action';
import { AuthStatus, ResponseCodes, ServerRoutes } from '../helpers/enum';
import { AuthUserWithToken, Offer, UserLogin } from '../types';
import { setAuthToken } from '../helpers/auth-token';

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
      const { data } = await api.get(ServerRoutes.LOGIN);

      const { token, ...authUser } = camelcaseKeys<AuthUserWithToken>(data, {
        deep: true,
      });

      dispatch(setAuthStatus(AuthStatus.AUTH));
      dispatch(setAuthUser(authUser));
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
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.message);
      }
    }
  };
}
