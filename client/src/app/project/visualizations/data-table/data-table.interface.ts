import { AlchemyEntity, AlchemyConcept } from '../../../shared/models/index';

export interface DataTableRow {
  name: string;
  type: string;
  sentiment?: string;
  relevance?: string;
  detail?: string;
  entity?: AlchemyEntity;
  concept?: AlchemyConcept;
}