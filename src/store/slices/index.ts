import { combineReducers } from '@reduxjs/toolkit';

import activeOfferReducer from './active-offer';
import favoritesReducer from './favorites';
import offersReducer from './offers';
import userReducer from './user';

const rootReducer = combineReducers({
  activeOffer: activeOfferReducer,
  favorites: favoritesReducer,
  offers: offersReducer,
  user: userReducer,
});

export default rootReducer;
