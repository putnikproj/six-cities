import { SortType } from './enum';
import { Offer, Review } from '../types';

export function sortOffers(offers: Offer[], sortType: SortType): Offer[] {
  switch (sortType) {
    case SortType.DEFAULT:
      return offers; // server-side sorting
    case SortType.PRICE_HIGH_TO_LOW:
      return [...offers].sort((prev, next) => next.price - prev.price);
    case SortType.PRICE_LOW_TO_HIGH:
      return [...offers].sort((prev, next) => prev.price - next.price);
    case SortType.RATING_HIGH_TO_LOW:
      return [...offers].sort((prev, next) => next.rating - prev.rating);
    default:
      return offers;
  }
}

export const sortReviewsByNewestDate = (reviews: Review[]): Review[] =>
  [...reviews].sort((prev, next) => Date.parse(next.date) - Date.parse(prev.date));
