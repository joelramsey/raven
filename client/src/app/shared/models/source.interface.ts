import { Record } from './record.interface';

export const SOURCE_TYPES = {
  file: 'file',
  url: 'url',
  text: 'text'
};

export interface Source {
  id: number;
  type: string;
  title: string;
  content: any;
  disabled?: boolean;
  visible?: boolean;
  record?: Record;
}
