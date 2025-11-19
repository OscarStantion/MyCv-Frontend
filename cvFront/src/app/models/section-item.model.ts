export interface CvSectionItem {
  id?: number;
  titulo?: string;
  descripcion?: string;
  extra?: string;
  fechaInicio?: string; // ISO 8601 recommended
  fechaFin?: string;
  sectionId?: number;
}
