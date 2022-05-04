import { createStore, applyMiddleware, Action } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';

import rootReducer from './slices';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, AxiosInstance, Action>;
export type AppThunk<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  RootState,
  AxiosInstance,
  Action
>;
