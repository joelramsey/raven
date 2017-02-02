import { AlchemyEntity, AlchemyConcept, Source } from '../../../shared/models/index';

export interface DataTableRow {
  name: string;
  type: string;
  alternateNames?: Array<string>;
  sentiment?: string;
  relevance?: string;
  detail?: string;
  entity?: AlchemyEntity;
  concept?: AlchemyConcept;
  sources?: Array<Source>;
  entities?: Array<DataTableRow>;
}