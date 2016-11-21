export interface  LinkDiagramNode {
  name: string;
  group: number;
}

export interface LinkDiagramLink {
  source: number;
  target: number;
  value: number;
}

export interface LinkDiagramDatum {
  nodes: Array<LinkDiagramNode>;
  links: Array<LinkDiagramLink>;
}