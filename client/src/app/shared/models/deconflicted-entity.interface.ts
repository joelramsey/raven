import { AlchemyResult } from './record.interface';
import { Source } from './source.interface';

export interface DeconflictedEntity {
  result: AlchemyResult;
  sources: Array<Source>;
}