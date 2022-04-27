import { AppThunk } from '.';
import { setAreOffersLoaded, setOffers } from './action';
import camelcaseKeys from 'camelcase-keys';
import { Offer } from '../types';

export function loadOffers(): AppThunk {
  return async (dispatch, getState, api) => {
    const { data } = await api.get('/hotels');
    const offers = camelcaseKeys<Offer[]>(data, { deep: true });
    dispatch(setOffers(offers));
    dispatch(setAreOffersLoaded(true));
  };
}
