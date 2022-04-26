import { Offer, Point } from '../types';

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function offerToPoint(offer: Offer): Point {
  return { id: offer.id, ...offer.location };
}
