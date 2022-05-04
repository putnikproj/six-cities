import { AppThunk } from '..';
import { api } from '../../helpers/api';
import { ServerRoutes } from '../../helpers/enum';
import { NewReview, Offer, Review } from '../../types';

// State

type ActiveOfferState = {
  activeOffer: Offer | null;
  nearbyOffers: Offer[] | null;
  reviews: Review[] | null;
};

const initialState: ActiveOfferState = {
  activeOffer: null,
  nearbyOffers: null,
  reviews: null,
};

// Reducer

enum ActionType {
  SET_ACTIVE_OFFER = 'main/setActiveOffer',
  SET_NEARBY_OFFERS = 'offer/setNearbyOffers',
  SET_REVIEWS = 'offer/setReviews',
}

export default function activeOfferReducer(
  state = initialState,
  action: activeOfferActions,
): ActiveOfferState {
  switch (action.type) {
    case ActionType.SET_ACTIVE_OFFER:
      return { ...state, activeOffer: action.payload.activeOffer };
    case ActionType.SET_NEARBY_OFFERS:
      return { ...state, nearbyOffers: action.payload.nearbyOffers };
    case ActionType.SET_REVIEWS:
      return { ...state, reviews: action.payload.reviews };
    default:
      return state;
  }
}

// Actions

export const setNearbyOffers = (nearbyOffers: ActiveOfferState['nearbyOffers']) =>
  ({
    type: ActionType.SET_NEARBY_OFFERS,
    payload: { nearbyOffers },
  } as const);

export const setActiveOffer = (activeOffer: ActiveOfferState['activeOffer']) =>
  ({
    type: ActionType.SET_ACTIVE_OFFER,
    payload: { activeOffer },
  } as const);

export const setReviews = (reviews: ActiveOfferState['reviews']) =>
  ({
    type: ActionType.SET_REVIEWS,
    payload: { reviews },
  } as const);

type activeOfferActions =
  | ReturnType<typeof setNearbyOffers>
  | ReturnType<typeof setActiveOffer>
  | ReturnType<typeof setReviews>;

// Async actions

export function loadOffer(id: Offer['id']): AppThunk {
  return async (dispatch) => {
    const { data: offer } = await api.get<Offer>(`${ServerRoutes.OFFERS}/${id}`);
    dispatch(setActiveOffer(offer));
  };
}

export function loadNearbyOffers(id: Offer['id']): AppThunk {
  return async (dispatch) => {
    const { data: nearbyOffers } = await api.get<Offer[]>(`${ServerRoutes.OFFERS}/${id}/nearby`);
    dispatch(setNearbyOffers(nearbyOffers));
  };
}

export function loadReviews(id: Offer['id']): AppThunk {
  return async (dispatch) => {
    const { data: reviews } = await api.get<Review[]>(`${ServerRoutes.REVIEWS}/${id}`);
    dispatch(setReviews(reviews));
  };
}

export function uploadReview(id: Offer['id'], review: NewReview): AppThunk {
  return async (dispatch) => {
    const { data: offerReviews } = await api.post<Review[]>(
      `${ServerRoutes.REVIEWS}/${id}`,
      review,
    );

    dispatch(setReviews(offerReviews));
  };
}

// Selectors
