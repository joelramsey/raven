import { Source } from './source.interface';

export interface EntityCardModel {
  name: string;
  type: string;
  count: number|string;
  sources: Array<Source>;
  alternateNames: Array<string>;
}