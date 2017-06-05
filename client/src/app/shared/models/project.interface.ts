import { Source } from './source.interface';

export interface Project {
  id: number;
  name?: string;
  template_type?: 'review' | 'essay' | 'research' | 'caseStudy' | 'summary' | 'dissertation' | 'thesis';
  font_size?: '9px' | '10px' | '11px' | '12px'
  margin?: 'normal' | 'moderate' | 'narrow' | 'wide'
  line_spacing?: 'single' | 'threehalves' | 'double'
  description?: string;
  notes?: string;
  sources?: Array<Source>;
  citation_style: any;
  updated_at?: string;
}
