import { Location } from './location';
import { Offer } from './offer';

export type Point = Location & {
  id: Offer['id'];
};
