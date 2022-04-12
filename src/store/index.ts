import { createStore } from 'redux';
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';
import { reducer } from './reducer';

export const store = createStore(reducer, composeWithDevToolsDevelopmentOnly());
