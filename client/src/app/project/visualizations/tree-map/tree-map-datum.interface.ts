import { AlchemyEntity, Source } from '../../../shared/models/index';

export interface TreeMapDatum {
  name: string;
  type?: string;
  children?: Array<TreeMapDatum>;
  entities?: Array<AlchemyEntity>;
  alternateNames?: Array<string>;
  size?: number;
  sources?: Array<Source>;
}
