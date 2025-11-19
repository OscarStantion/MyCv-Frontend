import type { CvSection } from './cv-section.model';

export interface CvRequest {
  nombre: string;
  profesion: string;
  descripcion?: string;
  experiencia?: string;
  educacion?: string;
  habilidades?: string;
  fotoUrl?: string;
}

export interface CvResponse {
  id: number;
  nombre: string;
  profesion: string;
  descripcion?: string;
  experiencia?: string;
  educacion?: string;
  habilidades?: string;
  fotoUrl?: string;
}
export interface CvFull extends CvResponse {
  secciones?: CvSection[];
}
