import type { CvSectionItem } from './cv-section-item.model';

export interface CvSection {
  id?: number;
  nombre: string;
  orden?: number;
  cvId?: number; // referencia al CV
  items?: CvSectionItem[];
}
