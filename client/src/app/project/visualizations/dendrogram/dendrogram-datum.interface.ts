import { AlchemyEntity, Source } from '../../../shared/models/index';

export interface DendrogramDatum {
  name: string;
  type?: string;
  children?: Array<DendrogramDatum>;
  entities?: Array<AlchemyEntity>;
  alternateNames?: Array<string>;
  count?: number;
  sources?: Array<Source>;
}
