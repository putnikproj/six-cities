// Routes
export enum AppRoute {
  ROOT = '/',
  LOGIN = '/login',
  FAVORITES = '/favorites',
  OFFER = '/offer',
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
