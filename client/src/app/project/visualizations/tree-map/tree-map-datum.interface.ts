import { AlchemyEntity, Source } from '../../../shared/models/index';

export interface TreeMapDatum {
  name: string;
  type?: string;
  children?: Array<TreeMapDatum>;
  entity?: AlchemyEntity;
  size?: number;
  sources?: Array<Source>;
}
