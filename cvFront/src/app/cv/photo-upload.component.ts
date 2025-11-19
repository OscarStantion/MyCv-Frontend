import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadService } from '../services/upload.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-photo-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <input type="file" (change)="onFile($event)" accept="image/*" />
      <div *ngIf="previewUrl"><img [src]="previewUrl" alt="preview" style="max-width:120px;border-radius:6px"/></div>
      <div *ngIf="progress>=0">Progreso: {{ progress }}%</div>
      <button (click)="upload()" [disabled]="!selected">Subir foto</button>
      <div *ngIf="uploadedUrl">Subido: <a [href]="uploadedUrl" target="_blank">Ver imagen</a></div>
    </div>
  `
})
export class PhotoUploadComponent {
  @Input() cvId?: number;
  selected?: File;
  previewUrl?: string;
  progress = -1;
  uploadedUrl?: string;

  constructor(private uploadService: UploadService) {}

  onFile(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (!file) return;
    this.selected = file;
    this.previewUrl = URL.createObjectURL(file);
  }

  upload() {
  if (!this.selected || !this.cvId) return alert('Falta CV id o archivo');
  this.uploadService.uploadPhoto(this.cvId, this.selected).subscribe({
      next: (ev) => {
        if (ev.type === HttpEventType.UploadProgress && ev.total) {
          this.progress = Math.round((100 * (ev.loaded ?? 0)) / ev.total);
        } else if (ev.type === HttpEventType.Response) {
          const body: any = ev.body;
          this.uploadedUrl = body?.fotoUrl ? (body.fotoUrl.startsWith('http') ? body.fotoUrl : `http://localhost:8080${body.fotoUrl}`) : '';
          this.progress = 100;
        }
      },
      error: (err) => alert('Error al subir: ' + err.message)
    });
  }
}
