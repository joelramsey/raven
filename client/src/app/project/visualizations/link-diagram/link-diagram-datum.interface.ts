import { AlchemyArgumentEntity, Source } from '../../../shared/models/index';

export interface  LinkDiagramNode {
  name: string;
  entity: AlchemyArgumentEntity;
  group: string|number;
  type?: string;
  sources?: Array<Source>;
  alternateNames?: Array<string>;
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