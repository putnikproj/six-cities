// Routes
export enum AppRoute {
  ROOT = '/',
  LOGIN = '/login',
  FAVORITES = '/favorites',
  OFFER = '/offer',
}

// Server
export enum ServerRoutes {
  OFFERS = '/hotels',
  REVIEWS = '/comments',
  FAVORITE = '/favorite',
  LOGIN = '/login',
  LOGOUT = '/logout',
}

export enum ResponseCodes {
  OK = 200,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

// Auth
export enum AuthStatus {
  AUTH = 'auth',
  UNAUTH = 'unauth',
  UNKNOWN = 'unknown',
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
