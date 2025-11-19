import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CvService } from '../services/cv.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import type { CvRequest, CvResponse } from '../models/cv.model';
import { PhotoUploadComponent } from './photo-upload.component';

@Component({
  selector: 'app-cv-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, PhotoUploadComponent],
  template: `
    <h2 *ngIf="isNew">Crear CV</h2>
    <h2 *ngIf="!isNew">Editar CV</h2>
    <form [formGroup]="form" (ngSubmit)="save()">
      <label>Nombre</label>
      <input formControlName="nombre" />
      <div *ngIf="form.controls['nombre'].invalid && form.controls['nombre'].touched">Nombre obligatorio</div>

      <label>Profesion</label>
      <input formControlName="profesion" />
      <div *ngIf="form.controls['profesion'].invalid && form.controls['profesion'].touched">Profesión obligatoria</div>

      <label>Descripción</label>
      <textarea formControlName="descripcion"></textarea>

      <label>Experiencia (texto)</label>
      <textarea formControlName="experiencia"></textarea>

      <label>Educación (texto)</label>
      <textarea formControlName="educacion"></textarea>

      <label>Habilidades (texto)</label>
      <textarea formControlName="habilidades"></textarea>

      <button type="submit" [disabled]="form.invalid">Guardar</button>
      <button type="button" (click)="cancel()">Cancelar</button>
    </form>

    <div style="margin-top:1rem" *ngIf="!isNew && cvId">
      <h3>Foto del CV</h3>
      <app-photo-upload [cvId]="cvId"></app-photo-upload>
    </div>
  `
})
export class CvEditComponent implements OnInit {
  form: any;

  isNew = true;
  cvId?: number;

  constructor(
    private fb: FormBuilder,
    private cvService: CvService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    // initialize form here to ensure FormBuilder is available
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      profesion: ['', [Validators.required]],
      descripcion: [''],
      experiencia: [''],
      educacion: [''],
      habilidades: ['']
    });
    if (idParam) {
      this.isNew = false;
      this.cvId = Number(idParam);
      this.cvService.getCvComplete(this.cvId).subscribe({ next: (full) => this.patch(full) });
    }
  }

  patch(cv: any) {
    this.form.patchValue({
      nombre: cv.nombre,
      profesion: cv.profesion,
      descripcion: cv.descripcion,
      experiencia: cv.experiencia,
      educacion: cv.educacion,
      habilidades: cv.habilidades
    });
  }

  save() {
  const payload = this.form.value as CvRequest;
    if (this.isNew) {
      this.cvService.createCv(payload).subscribe({ next: (r) => this.router.navigate(['/cv', r.id]) });
    } else if (this.cvId) {
      this.cvService.updateCv(this.cvId, payload).subscribe({ next: (r) => this.router.navigate(['/cv', r.id]) });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
