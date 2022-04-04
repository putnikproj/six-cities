export const AppRoute = {
  ROOT: '/',
  LOGIN: '/login',
  FAVORITES: '/favorites',
  OFFER: '/offer',
} as const;

export const ActionType = {
  CHANGE_CITY: 'main/changeCity',
  ADD_CITY_OFFERS: 'main/addCityOffers',
} as const;

export const PlaceCardType = {
  MAIN: 'MAIN',
  FAVORITES: 'FAVORITES',
  OFFER: 'OFFER',
} as const;

export const PlaceCardPrefix = {
  MAIN: 'cities',
  FAVORITES: 'favorites',
  OFFER: 'near-places',
} as const;

export const CityName = {
  PARIS: 'Paris',
  COLOGNE: 'Cologne',
  BRUSSELS: 'Brussels',
  AMSTERDAM: 'Amsterdam',
  HAMBURG: 'Hamburg',
  DUSSELDORF: 'Dusseldorf',
} as const;

export const PointerImage = {
  DEFAULT: 'img/pin.svg',
  ACTIVE: 'img/pin-active.svg',
} as const;

export const IS_AUTH = true;

export const MAX_OFFER_NEAR_PLACES = 3;

export const MAX_OFFER_IMAGES = 6;

export const MAX_OFFER_REVIEWS = 10;

export const Settings = {
  PLACES_AMOUNT: 312,
};
