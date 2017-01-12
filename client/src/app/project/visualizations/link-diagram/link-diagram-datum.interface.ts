import { AlchemyArgumentEntity } from '../../../shared/models/index';

export interface  LinkDiagramNode {
  name: string;
  entity: AlchemyArgumentEntity;
  group: string|number;
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