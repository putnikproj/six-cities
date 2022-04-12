import { SortType } from './const';
import { Offer } from '../types/offer';

export function sortOffers(offers: Offer[], sortType: SortType) {
  switch (sortType) {
    case SortType.DEFAULT:
      return [...offers]; // server-side sorting
    case SortType.PRICE_HIGH_TO_LOW:
      return [...offers.sort((prev, next) => next.price - prev.price)];
    case SortType.PRICE_LOW_TO_HIGH:
      return [...offers.sort((prev, next) => prev.price - next.price)];
    case SortType.RATING_HIGH_TO_LOW:
      return [...offers.sort((prev, next) => next.rating - prev.rating)];
    default:
      return [...offers];
  }
}
