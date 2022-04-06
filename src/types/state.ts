import { ActiveCity } from './city';
import { Offer, OfferSort } from './offer';

export type State = {
  activeCity: ActiveCity,
  offers: Offer[],
  sortType: OfferSort,
  activeOffer: Offer | null,
};
