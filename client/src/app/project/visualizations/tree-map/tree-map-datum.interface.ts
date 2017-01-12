import { AlchemyEntity } from '../../../shared/models/index';

export interface TreeMapDatum {
  name: string;
  children?: Array<TreeMapDatum>;
  entity?: AlchemyEntity;
  size?: number;
}
