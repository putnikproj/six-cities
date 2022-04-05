import { Location } from './location';
import { City } from './city';
import { User } from './user';
import { EnumValues } from './util-types';
import { SortType } from '../const';

export type Offer = {
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: User,
  id: number | string,
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: Location,
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: string,
};

export type OfferSort = EnumValues<typeof SortType>;
