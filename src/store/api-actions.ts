import { AppThunk } from '.';
import { setAreOffersLoaded, setAuthStatus, setOffers } from './action';
import camelcaseKeys from 'camelcase-keys';
import { Offer } from '../types';
import { AuthStatus, ResponseCodes, ServerRoutes } from '../helpers/enum';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { AxiosError } from 'axios';

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
      } else {
        toast.error(`Unexpected error: ${e}`);
      }
    }
  };
}
