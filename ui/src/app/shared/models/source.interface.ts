import { Record } from './record.interface';
export interface Source {
  id: number;
  type: string;
  title: string;
  content: any;
  disabled?: boolean;
  visible?: boolean;
  record?: Record;
}
