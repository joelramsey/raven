export interface TreeMapDatum {
  name: string;
  children?: Array<TreeMapDatum>;
  size?: number;
}
