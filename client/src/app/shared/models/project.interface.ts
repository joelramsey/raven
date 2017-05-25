import { Source } from './source.interface';

export interface Project {
  id: number;
  name?: string;
  description?: string;
  notes?: string;
  sources?: Array<Source>;
  citation_style: any;
  updated_at?: string;
}
