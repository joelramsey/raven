import { Source } from './source.interface';

export interface Project {
  id: number;
  name: string;
  description: string;
  sources: Array<Source>;
}