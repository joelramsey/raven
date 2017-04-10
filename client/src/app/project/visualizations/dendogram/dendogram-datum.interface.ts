import { AlchemyEntity, Source } from '../../../shared/models/index';

export interface DendogramDatum {
  name: string;
  type?: string;
  children?: Array<DendogramDatum>;
  entities?: Array<AlchemyEntity>;
  alternateNames?: Array<string>;
  count?: number;
  sources?: Array<Source>;
}
