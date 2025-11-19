import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvService } from '../services/cv.service';
import { SectionService } from '../services/section.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import type { CvFull } from '../models/cv.model';

@Component({
  selector: 'app-cv-full',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="cv">
  <h2>{{ cv.nombre }} — {{ professionLabel() }}</h2>
      <img *ngIf="cv.fotoUrl" [src]="resolveFotoUrl(cv.fotoUrl)" alt="Foto" style="max-width:150px;border-radius:6px" />
      <p *ngIf="cv.descripcion">{{ cv.descripcion }}</p>

      <section *ngFor="let s of cv.secciones"> 
        <h3>{{ s.nombre }}</h3>
        <div *ngIf="s.items?.length; else empty"> 
          <article *ngFor="let it of s.items">
            <h4>{{ it.titulo }}</h4>
            <p>{{ it.descripcion }}</p>
            <small *ngIf="it.extra">{{ it.extra }}</small>
            <div *ngIf="it.fechaInicio || it.fechaFin">{{ it.fechaInicio }} - {{ it.fechaFin }}</div>
          </article>
        </div>
        <ng-template #empty><p>No hay items en esta sección.</p></ng-template>
      </section>
    </div>
    <div *ngIf="!cv">Cargando...</div>
  `
})
export class CvFullComponent implements OnInit {
  cv?: CvFull;
  cvId?: number;

  constructor(private cvService: CvService, private sectionService: SectionService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.cvId = id;
      this.cvService.getCvComplete(id).subscribe({ next: (c) => (this.cv = c) });
    }
  }

  resolveFotoUrl(url: string) {
    if (!url) return '';
    return url.startsWith('http') ? url : `http://localhost:8080${url}`;
  }

  // Return the profession label but replace "Frontend" with "Full Stack" for display
  professionLabel(): string {
    if (!this.cv || !this.cv.profesion) return '';
    try {
      return this.cv.profesion.replace(/Frontend/i, 'Full Stack');
    } catch (e) {
      return this.cv.profesion;
    }
  }
}
