import { AlchemyArgumentEntity, Source } from '../../../shared/models/index';

export interface  LinkDiagramNode {
  name: string;
  entity: AlchemyArgumentEntity;
  group: string|number;
  sources?: Array<Source>;
}

export interface LinkDiagramLink {
  source: number;
  target: number;
  value: number;
  type: string;
}

export interface LinkDiagramDatum {
  nodes: Array<LinkDiagramNode>;
  links: Array<LinkDiagramLink>;
}