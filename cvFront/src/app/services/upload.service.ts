import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE } from '../config/api.config';
import type { CvResponse } from '../models/cv.model';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private base = `${API_BASE}/cv`;

  constructor(private http: HttpClient) {}

  uploadPhoto(cvId: number, file: File): Observable<HttpEvent<CvResponse>> {
    const url = `${this.base}/${cvId}/foto`;
    const fd = new FormData();
    fd.append('file', file);
    return this.http.request<CvResponse>('PUT', url, {
      body: fd,
      reportProgress: true,
      observe: 'events'
    });
  }
}
