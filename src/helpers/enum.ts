// Routes
export enum AppRoute {
  ROOT = '/',
  LOGIN = '/login',
  FAVORITES = '/favorites',
  OFFER = '/offer',
}

// Actions
export enum ActionType {
  SET_ACTIVE_CITY = 'main/setActiveCity',
  SET_CITY_OFFERS = 'main/setCityOffers',
  SET_SORT_TYPE = 'main/setSortType',
  SET_ACTIVE_OFFER = 'main/setActiveOffer',
  LOAD_REVIEWS = 'offer/loadReviews',
}

// Cities
export enum CityName {
  PARIS = 'Paris',
  COLOGNE = 'Cologne',
  BRUSSELS = 'Brussels',
  AMSTERDAM = 'Amsterdam',
  HAMBURG = 'Hamburg',
  DUSSELDORF = 'Dusseldorf',
}

// Main page
export enum SortType {
  DEFAULT = 'Popular',
  PRICE_LOW_TO_HIGH = 'PriceLowToHigh',
  PRICE_HIGH_TO_LOW = 'PriceHighToLow',
  RATING_HIGH_TO_LOW = 'TopRatedFirst',
}

// Place-card component
export enum PlaceCardType {
  MAIN = 'MAIN',
  FAVORITES = 'FAVORITES',
  OFFER = 'OFFER',
}

export enum PlaceCardPrefix {
  MAIN = 'cities',
  FAVORITES = 'favorites',
  OFFER = 'near-places',
}

// Map component
export enum PointerImage {
  DEFAULT = 'img/pin.svg',
  ACTIVE = 'img/pin-active.svg',
}
