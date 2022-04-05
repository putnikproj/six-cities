import { CityName } from '../const';
import { Location } from './location';

export type City = {
  location: Location,
  name: string,
}

export type ActiveCity = typeof CityName[keyof typeof CityName];
