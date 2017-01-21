import { Source } from './source.interface';

export interface EntityCardModel {
  name: string;
  weight: number|string;
  size: number|string;
  sources: Array<Source>;
}