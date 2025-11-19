import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import type { CvResponse, CvRequest, CvFull } from '../models/cv.model';
import { STATIC_CV, STATIC_CV_SUMMARY } from '../data/static-cv';

/**
 * CvService (static) — ahora devuelve datos locales en lugar de realizar llamadas al backend.
 * Esto permite que la app funcione completamente en Angular sin depender de un servidor.
 */
@Injectable({ providedIn: 'root' })
export class CvService {
  constructor() {}

  getCvSummary(): Observable<CvResponse> {
    // Devolver resumen estático
    return of(STATIC_CV_SUMMARY as CvResponse);
  }

  createCv(payload: CvRequest): Observable<CvResponse> {
    // No persistimos cambios en esta versión estática — devolver el resumen estático
    console.warn('createCv called in static mode — no backend available. Returning static summary.');
    return of(STATIC_CV_SUMMARY as CvResponse);
  }

  updateCv(id: number, payload: CvRequest): Observable<CvResponse> {
    // No persistimos cambios en esta versión estática — devolver el resumen estático
    console.warn('updateCv called in static mode — no backend available. Returning static summary.');
    return of(STATIC_CV_SUMMARY as CvResponse);
  }

  getCvComplete(cvId: number): Observable<CvFull> {
    // Ignoramos cvId y devolvemos el CV estático
    return of(STATIC_CV as CvFull);
  }
}
