import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SectionService } from '../services/section.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import type { CvSection } from '../models/cv-section.model';

@Component({
  selector: 'app-section-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <h3 *ngIf="isNew">Crear sección</h3>
    <h3 *ngIf="!isNew">Editar sección</h3>
    <form [formGroup]="form" (ngSubmit)="save()">
      <label>Nombre</label>
      <input formControlName="nombre" />
      <div *ngIf="form.controls['nombre'].invalid && form.controls['nombre'].touched">Nombre obligatorio</div>

      <label>Orden</label>
      <input type="number" formControlName="orden" />

      <button type="submit" [disabled]="form.invalid">Guardar</button>
      <button type="button" (click)="cancel()">Cancelar</button>
    </form>
  `
})
export class SectionEditComponent implements OnInit {
  form: any;
  isNew = true;
  sectionId?: number;
  cvId?: number;

  constructor(private fb: FormBuilder, private ssvc: SectionService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({ nombre: ['', [Validators.required]], orden: [0] });
    const idParam = this.route.snapshot.paramMap.get('id');
    const cvParam = this.route.snapshot.paramMap.get('cvId');
    if (cvParam) this.cvId = Number(cvParam);
    if (idParam) {
      this.isNew = false;
      this.sectionId = Number(idParam);
      // fetch single section is not provided in backend; get sections and find
      if (this.cvId) {
        this.ssvc.getSectionsByCv(this.cvId).subscribe({ next: (list) => {
          const found = list.find(s=>s.id === this.sectionId);
          if (found) this.form.patchValue({ nombre: found.nombre, orden: found.orden });
        }});
      }
    }
  }

  save() {
  const payload: CvSection = this.form.value as CvSection;
    if (this.isNew) {
      if (!this.cvId) return alert('Falta cvId');
      this.ssvc.createSection(this.cvId, payload).subscribe({ next: () => this.router.navigate(['/cv', this.cvId, 'secciones']) });
    } else if (this.sectionId) {
      this.ssvc.updateSection(this.sectionId, payload).subscribe({ next: () => this.router.navigate(['/cv', this.cvId, 'secciones']) });
    }
  }

  cancel() { this.router.navigate(['/cv', this.cvId, 'secciones']); }
}
