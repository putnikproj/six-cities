import { CityName, SortType } from '../helpers/enum';
import { Offer } from './offer';
import { Review } from './review';

export type State = {
  activeCity: CityName;
  offers: Offer[];
  sortType: SortType;
  activeOffer: Offer | null;
  reviews: Review[];
};
