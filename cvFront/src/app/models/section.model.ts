import type { CvSectionItem } from './section-item.model';

export interface CvSection {
  id?: number;
  nombre: string;
  orden?: number;
  cvId?: number; // referencia al CV
  items?: CvSectionItem[];
}
