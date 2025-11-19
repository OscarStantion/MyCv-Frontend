import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE } from '../config/api.config';
import type { CvSection } from '../models/cv-section.model';
import type { CvSectionItem } from '../models/cv-section-item.model';

@Injectable({ providedIn: 'root' })
export class SectionService {
  private base = `${API_BASE}/cv`;

  constructor(private http: HttpClient) {}

  // Use existing backend routes (including inconsistent ones) as they are in the repo
  getSectionsByCv(cvId: number): Observable<CvSection[]> {
    // backend currently exposes GET /api/cv/cv/{cvId}
  return this.http.get<CvSection[]>(`${this.base}/cv/${cvId}`);
  }

  createSection(cvId: number, section: CvSection): Observable<CvSection> {
    return this.http.post<CvSection>(`${this.base}/${cvId}/secciones`, section);
  }

  updateSection(sectionId: number, section: CvSection): Observable<CvSection> {
    // backend exposes PUT /api/cv/{sectionId} for section edits
    return this.http.put<CvSection>(`${this.base}/${sectionId}`, section);
  }

  deleteSection(sectionId: number): Observable<string> {
    return this.http.delete<string>(`${this.base}/${sectionId}`);
  }

  // Items
  getItems(sectionId: number): Observable<CvSectionItem[]> {
    // backend exposes GET /api/cv/{sectionId}/items
  return this.http.get<CvSectionItem[]>(`${this.base}/${sectionId}/items`);
  }

  addItem(sectionId: number, item: CvSectionItem): Observable<CvSectionItem> {
    // backend exposes POST /api/cv/secciones/{sectionId}/items
    return this.http.post<CvSectionItem>(`${this.base}/secciones/${sectionId}/items`, item);
  }

  updateItem(itemId: number, item: CvSectionItem): Observable<CvSectionItem> {
    return this.http.put<CvSectionItem>(`${this.base}/items/${itemId}`, item);
  }

  deleteItem(itemId: number): Observable<string> {
    return this.http.delete<string>(`${this.base}/items/${itemId}`);
  }
}
