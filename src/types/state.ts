import { ActiveCity } from './city';
import { Offer } from './offer';

export type State = {
  activeCity: ActiveCity,
  offers: Offer[],
};
