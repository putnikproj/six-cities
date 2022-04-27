import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';

import { createAPI } from '../helpers/api';
import { Actions, reducer } from './reducer';

const api = createAPI();

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, AxiosInstance, Actions>;
export type AppThunk<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  RootState,
  AxiosInstance,
  Actions
>;
