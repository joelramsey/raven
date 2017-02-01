import { Source } from './source.interface';

export interface EntityCardModel {
  name: string;
  type: string;
  weight: number|string;
  size: number|string;
  sources: Array<Source>;
  alternateNames: Array<string>;
}