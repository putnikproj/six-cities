import { CityName, SortType } from '../helpers/const';
import { Offer } from './offer';

export type State = {
  activeCity: CityName;
  offers: Offer[];
  sortType: SortType;
  activeOffer: Offer | null;
};
