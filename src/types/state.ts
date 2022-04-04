import { CityName } from '../const';
import { Offer } from './offer';

export type State = {
  activeCity: typeof CityName[keyof typeof CityName],
  offers: Offer[],
};
