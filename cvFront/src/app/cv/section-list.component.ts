import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionService } from '../services/section.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import type { CvSection } from '../models/cv-section.model';

@Component({
  selector: 'app-section-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div *ngIf="!sections">Cargando secciones...</div>
    <div *ngIf="sections">
      <h3>Secciones</h3>
      <button (click)="create()">Crear sección</button>
      <ul>
        <li *ngFor="let s of paged()">
          <strong>{{ s.nombre }}</strong> (orden: {{ s.orden }})
          <button (click)="edit(s)">Editar</button>
          <button (click)="openItems(s)">Items</button>
          <button (click)="remove(s)">Eliminar</button>
        </li>
      </ul>

      <div class="pagination">
        <button (click)="prev()" [disabled]="page===1">Prev</button>
        <span> página {{page}} / {{ totalPages() }} </span>
        <button (click)="next()" [disabled]="page===totalPages()">Next</button>
        <select [(ngModel)]="pageSize" (change)="onPageSizeChange($event)">
          <option [value]="5">5</option>
          <option [value]="10">10</option>
          <option [value]="20">20</option>
        </select>
      </div>
    </div>
  `
})
export class SectionListComponent implements OnInit {
  sections?: CvSection[];
  cvId?: number;
  page = 1;
  pageSize = 5;

  constructor(private ssvc: SectionService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cvId = id;
    if (id) {
      this.load();
    }
  }

  load() {
    if (!this.cvId) return;
    this.ssvc.getSectionsByCv(this.cvId).subscribe({ next: (list) => (this.sections = list) });
  }

  paged() {
    if (!this.sections) return [];
    const start = (this.page - 1) * this.pageSize;
    return this.sections.slice(start, start + this.pageSize);
  }

  totalPages() {
    if (!this.sections) return 1;
    return Math.max(1, Math.ceil(this.sections.length / this.pageSize));
  }

  prev() { if (this.page>1) this.page--; }
  next() { if (this.page < this.totalPages()) this.page++; }
  onPageSizeChange(e:any){ this.page = 1; }

  create(){ if(this.cvId) this.router.navigate(['/cv', this.cvId, 'secciones', 'create']); }
  edit(s: CvSection){ this.router.navigate(['/secciones', s.id, 'edit']); }
  openItems(s: CvSection){ this.router.navigate(['/secciones', s.id, 'items']); }
  remove(s: CvSection){ if(!s.id) return; this.ssvc.deleteSection(s.id).subscribe({ next: () => this.load() }); }
}
