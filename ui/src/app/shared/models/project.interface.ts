import { Source } from './source.interface';

export interface Project {
  id: number;
  name?: string;
  description?: string;
  notes?: string;
  sources?: Array<Source>;
  updated_at?: string;
}