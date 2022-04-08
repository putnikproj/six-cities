import * as actions from '../store/action';
import { InferValueTypes } from './util-types';

// Taken from: https://habr.com/ru/company/alfa/blog/452620/
// Automatically returns union of all actions that the app has. Used for typing reducer
export type ActionsType = ReturnType<InferValueTypes<typeof actions>>;
