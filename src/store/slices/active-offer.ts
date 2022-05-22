import { createAction, createAsyncThunk, createReducer, createSelector } from '@reduxjs/toolkit';

import { RootState } from '..';
import { api, APIData, APIError, serializeAPIError } from '../../helpers/api';
import { LoadingStatus, ServerRoutes } from '../../helpers/enum';
import { sortReviewsByNewestDate } from '../../helpers/sort';
import { offerToPoint } from '../../helpers/util';
import { NewReview, Offer, Review } from '../../types';

const MAX_NEARBY_OFFERS = 3;
const MAX_REVIEWS = 10;

// State

type ActiveOfferState = {
  activeOffer: APIData<Offer | null>;
  mapActiveOffer: Offer | null;
  nearbyOffers: APIData<Offer[]>;
  reviews: APIData<Review[]>;
};

const initialState: ActiveOfferState = {
  activeOffer: {
    loadingStatus: LoadingStatus.IDLE,
    data: null,
  },
  mapActiveOffer: null,
  nearbyOffers: {
    loadingStatus: LoadingStatus.IDLE,
    data: [],
  },
  reviews: {
    loadingStatus: LoadingStatus.IDLE,
    data: [],
  },
};

// Reducer

enum ActionType {
  LOAD_OFFER = 'activeOffer/loadOffer',
  LOAD_NEARBY_OFFERS = 'activeOffer/loadNearbyOffers',
  LOAD_REVIEWS = 'activeOffer/loadReviews',
  UPLOAD_REVIEW = 'activeOffer/uploadReview',
  ACTIVE_OFFER_OUTDATED = 'activeOffer/outdated',
  MAP_ACTIVE_OFFER_CHANGED = 'map/activeOfferChanged',
}

// Async actions

export const loadOffer = createAsyncThunk<Offer, Offer['id'], { serializedErrorType: APIError }>(
  ActionType.LOAD_OFFER,
  async (id, thunkAPI) => {
    thunkAPI.dispatch(loadNeabyOffers(id));
    thunkAPI.dispatch(loadReviews(id));

    const { data: offer } = await api.get<Offer>(`${ServerRoutes.OFFERS}/${id}`, {
      signal: thunkAPI.signal,
    });
    thunkAPI.dispatch(mapActiveOfferChanged(offer));
    return offer;
  },
  { serializeError: serializeAPIError },
);

export const loadNeabyOffers = createAsyncThunk<
  Offer[],
  Offer['id'],
  { serializedErrorType: APIError }
>(
  ActionType.LOAD_NEARBY_OFFERS,
  async (id, thunkAPI) => {
    const { data: nearbyOffers } = await api.get<Offer[]>(`${ServerRoutes.OFFERS}/${id}/nearby`, {
      signal: thunkAPI.signal,
    });
    return nearbyOffers;
  },
  { serializeError: serializeAPIError },
);

export const loadReviews = createAsyncThunk<
  Review[],
  Offer['id'],
  { serializedErrorType: APIError }
>(
  ActionType.LOAD_REVIEWS,
  async (id, thunkAPI) => {
    const { data: reviews } = await api.get<Review[]>(`${ServerRoutes.REVIEWS}/${id}`, {
      signal: thunkAPI.signal,
    });
    return reviews;
  },
  { serializeError: serializeAPIError },
);

export const uploadReview = createAsyncThunk<
  Review[],
  { id: Offer['id']; review: NewReview },
  { serializedErrorType: APIError }
>(
  ActionType.UPLOAD_REVIEW,
  async ({ id, review }) => {
    const { data: offerReviews } = await api.post<Review[]>(
      `${ServerRoutes.REVIEWS}/${id}`,
      review,
    );
    return offerReviews;
  },
  { serializeError: serializeAPIError },
);

// Actions

export const mapActiveOfferChanged = createAction<ActiveOfferState['mapActiveOffer']>(
  ActionType.MAP_ACTIVE_OFFER_CHANGED,
);
export const activeOfferOutdated = createAction(ActionType.ACTIVE_OFFER_OUTDATED);

const activeOfferReducer = createReducer(initialState, (builder) => {
  builder
    // loadOffer
    .addCase(loadOffer.pending, (state) => {
      state.activeOffer.loadingStatus = LoadingStatus.LOADING;
    })
    .addCase(loadOffer.fulfilled, (state, action) => {
      state.activeOffer.loadingStatus = LoadingStatus.SUCCEEDED;
      state.activeOffer.data = action.payload;
    })
    .addCase(loadOffer.rejected, (state, action) => {
      state.activeOffer.loadingStatus = LoadingStatus.FAILED;
      state.activeOffer.error = action.error;
    })
    .addCase(activeOfferOutdated, (state) => {
      state.activeOffer.loadingStatus = LoadingStatus.IDLE;
      state.nearbyOffers.loadingStatus = LoadingStatus.IDLE;
      state.reviews.loadingStatus = LoadingStatus.IDLE;
      state.mapActiveOffer = null;
    })
    // map
    .addCase(mapActiveOfferChanged, (state, action) => {
      state.mapActiveOffer = action.payload;
    })
    // nearbyOffers
    .addCase(loadNeabyOffers.pending, (state) => {
      state.nearbyOffers.loadingStatus = LoadingStatus.LOADING;
    })
    .addCase(loadNeabyOffers.fulfilled, (state, action) => {
      state.nearbyOffers.loadingStatus = LoadingStatus.SUCCEEDED;
      state.nearbyOffers.data = action.payload;
    })
    .addCase(loadNeabyOffers.rejected, (state) => {
      state.nearbyOffers.loadingStatus = LoadingStatus.FAILED;
    })
    // reviews
    .addCase(loadReviews.pending, (state) => {
      state.reviews.loadingStatus = LoadingStatus.LOADING;
    })
    .addCase(loadReviews.fulfilled, (state, action) => {
      state.reviews.loadingStatus = LoadingStatus.SUCCEEDED;
      state.reviews.data = action.payload;
    })
    .addCase(loadReviews.rejected, (state) => {
      state.reviews.loadingStatus = LoadingStatus.FAILED;
    })
    .addCase(uploadReview.fulfilled, (state, action) => {
      state.reviews.data = action.payload;
    });
});

export default activeOfferReducer;

// Selectors

export const activeOfferSelector = (state: RootState) => state.activeOffer.activeOffer.data;
export const activeOfferLoadingStatusSelector = (state: RootState) =>
  state.activeOffer.activeOffer.loadingStatus;
export const activeOfferErrorSelector = (state: RootState) => state.activeOffer.activeOffer.error;

export const reviewsSelector = (state: RootState) =>
  state.activeOffer.reviews.data.slice(0, MAX_REVIEWS);
export const reviewsLoadingStatusSelector = (state: RootState) =>
  state.activeOffer.reviews.loadingStatus;
export const sortedReviewsSelector = createSelector([reviewsSelector], (reviews) =>
  sortReviewsByNewestDate(reviews),
);

export const nearbyOffersSelector = (state: RootState) =>
  state.activeOffer.nearbyOffers.data.slice(0, MAX_NEARBY_OFFERS);
export const nearbyOffersLoadingStatusSelector = (state: RootState) =>
  state.activeOffer.nearbyOffers.loadingStatus;

export const mapActiveOfferSelector = (state: RootState) => state.activeOffer.mapActiveOffer;
export const mapPointsSelector = createSelector([nearbyOffersSelector], (offers) =>
  offers.map((item) => offerToPoint(item)),
);
