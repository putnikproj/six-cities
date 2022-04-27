import { createStore, applyMiddleware } from 'redux';
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

import { createAPI } from '../helpers/api';
import { reducer } from './reducer';

const api = createAPI();
export const store = createStore(
  reducer,
  composeWithDevToolsDevelopmentOnly(applyMiddleware(thunk.withExtraArgument(api))),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
