import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionService } from '../services/section.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import type { CvSectionItem } from '../models/cv-section-item.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-section-items',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div *ngIf="!items">Cargando items...</div>
    <div *ngIf="items">
      <h4>Items</h4>
      <button (click)="create()">Agregar item</button>
      <ul>
        <li *ngFor="let it of paged()">
          <strong>{{ it.titulo }}</strong>
          <div>{{ it.descripcion }}</div>
          <small>{{ it.extra }}</small>
          <div>{{ it.fechaInicio }} - {{ it.fechaFin }}</div>
          <button (click)="edit(it)">Editar</button>
          <button (click)="remove(it)">Eliminar</button>
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
export class SectionItemsComponent implements OnInit {
  sectionId?: number;
  items?: CvSectionItem[];
  page = 1;
  pageSize = 5;

  constructor(private ssvc: SectionService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sectionId = id;
    if (id) this.load();
  }

  load(){ if(!this.sectionId) return; this.ssvc.getItems(this.sectionId).subscribe({ next: (list) => this.items = list }); }

  paged(){ if(!this.items) return []; const start=(this.page-1)*this.pageSize; return this.items.slice(start, start+this.pageSize); }
  totalPages(){ if(!this.items) return 1; return Math.max(1, Math.ceil(this.items.length/this.pageSize)); }
  prev(){ if(this.page>1) this.page--; }
  next(){ if(this.page < this.totalPages()) this.page++; }
  onPageSizeChange(e:any){ this.page=1; }

  create(){ if(this.sectionId) this.router.navigate(['/secciones', this.sectionId, 'items', 'create']); }
  edit(it: CvSectionItem){ if(it.id) this.router.navigate(['/secciones', this.sectionId, 'items', it.id, 'edit']); }
  remove(it: CvSectionItem){ if(!it.id) return; this.ssvc.deleteItem(it.id).subscribe({ next: () => this.load() }); }
}
