import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SectionService } from '../services/section.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import type { CvSectionItem } from '../models/cv-section-item.model';

@Component({
  selector: 'app-item-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <h3 *ngIf="isNew">Crear item</h3>
    <h3 *ngIf="!isNew">Editar item</h3>
    <form [formGroup]="form" (ngSubmit)="save()">
      <label>Título</label>
      <input formControlName="titulo" />

      <label>Descripción</label>
      <textarea formControlName="descripcion"></textarea>

      <label>Extra</label>
      <input formControlName="extra" />

      <label>Fecha inicio</label>
      <input type="date" formControlName="fechaInicio" />

      <label>Fecha fin</label>
      <input type="date" formControlName="fechaFin" />

      <button type="submit">Guardar</button>
      <button type="button" (click)="cancel()">Cancelar</button>
    </form>
  `
})
export class ItemEditComponent implements OnInit {
  form: any;
  isNew = true;
  sectionId?: number;
  itemId?: number;

  constructor(private fb: FormBuilder, private ssvc: SectionService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({ titulo: [''], descripcion: [''], extra: [''], fechaInicio: [''], fechaFin: [''] });
    const sectionParam = this.route.snapshot.paramMap.get('id');
    const itemParam = this.route.snapshot.paramMap.get('itemId');
    if (sectionParam) this.sectionId = Number(sectionParam);
    if (itemParam) {
      this.isNew = false;
      this.itemId = Number(itemParam);
      // backend doesn't provide get-item-by-id endpoint; fetch items and find
      if (this.sectionId) {
        this.ssvc.getItems(this.sectionId).subscribe({ next: (list) => {
          const found = list.find(i=>i.id === this.itemId);
          if (found) this.form.patchValue(found);
        }});
      }
    }
  }

  save() {
  const payload: CvSectionItem = this.form.value as CvSectionItem;
    if (this.isNew) {
      if (!this.sectionId) return alert('Falta sectionId');
      this.ssvc.addItem(this.sectionId, payload).subscribe({ next: () => this.router.navigate(['/secciones', this.sectionId, 'items']) });
    } else if (this.itemId) {
      this.ssvc.updateItem(this.itemId, payload).subscribe({ next: () => this.router.navigate(['/secciones', this.sectionId, 'items']) });
    }
  }

  cancel(){ this.router.navigate(['/secciones', this.sectionId, 'items']); }
}
