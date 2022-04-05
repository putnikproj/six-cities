import { CityName } from '../const';
import { Location } from './location';
import { EnumValues } from './util-types';

export type City = {
  location: Location,
  name: string,
}

export type ActiveCity = EnumValues<typeof CityName>;
