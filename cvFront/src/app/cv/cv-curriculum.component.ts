import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvService } from '../services/cv.service';
import type { CvFull } from '../models/cv.model';

@Component({
    selector: 'app-cv-curriculum',
    standalone: true,
    imports: [CommonModule],
    template: `
  <div class="curriculum-page">
      <h1 class="page-title">Currículum</h1>

      <!-- Experiencia Laboral (siempre visible) -->
      <section class="cv-section-row">
        <div class="section-left">
          <h2 class="section-heading">Experiencia laboral</h2>
        </div>
        <div class="section-right">
          <!-- Mostrar experiencia estática (sin depender del backend) -->
          <div class="placeholder-content">
            <div class="placeholder-section">
              <div class="experience-list">
                <div class="job-block">
                  <strong class="job-title">DESARROLLADOR WEB</strong>
                  <ul>
                    <li>
                      Proyecto universitario de registro de sangre para clínica
                      <ul>
                        <li>Colaboración en equipo para desarrollar un sistema de registro de sangre.</li>
                        <li>Tecnologías: Java, MySQL, HTML, CSS, JavaScript.</li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <div class="job-block">
                  <strong class="job-title">DESARROLLADOR WEB</strong>
                  <ul>
                    <li>
                      Página web para colegio — Creación de sitio web institucional junto a un equipo universitario.
                      <ul>
                        <li>Tecnologías: PHP, HTML, CSS, JavaScript, MySQL.</li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <div class="job-block">
                  <strong class="job-title">DESARROLLADOR WEB</strong>
                  <ul>
                    <li>
                      Sistema de reservas de canchas deportivas — Desarrollo de aplicación web con equipo de desarrollo.
                      <ul>
                        <li>Tecnologías: Angular, TypeScript, Tailwind, PostgreSQL.</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <ng-template #expPlaceholder>
            <div class="placeholder-content">
              <div class="placeholder-section">
                <div class="experience-list">
                  <div class="job-block">
                    <strong class="job-title">DESARROLLADOR WEB</strong>
                    <ul>
                      <li>
                        Proyecto universitario de registro de sangre para clínica
                        <ul>
                          <li>Colaboración en equipo para desarrollar un sistema de registro de sangre.</li>
                          <li>Tecnologías: Java, MySQL, HTML, CSS, JavaScript.</li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                  <div class="job-block">
                    <strong class="job-title">DESARROLLADOR WEB</strong>
                    <ul>
                      <li>
                        Página web para colegio — Creación de sitio web institucional junto a un equipo universitario.
                        <ul>
                          <li>Tecnologías: PHP, HTML, CSS, JavaScript, MySQL.</li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                  <div class="job-block">
                    <strong class="job-title">DESARROLLADOR WEB</strong>
                    <ul>
                      <li>
                        Sistema de reservas de canchas deportivas — Desarrollo de aplicación web con equipo de desarrollo.
                        <ul>
                          <li>Tecnologías: Angular, TypeScript, Tailwind, PostgreSQL.</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </ng-template>
        </div>
      </section>

      <div class="section-divider"></div>

      <!-- Educación (siempre visible) -->
      <section class="cv-section-row">
        <div class="section-left">
          <h2 class="section-heading">Educación</h2>
        </div>
        <div class="section-right">
          <ng-container *ngIf="getItemsByNames(['educación', 'educacion', 'education']).length > 0; else eduPlaceholder">
            <div *ngFor="let item of getItemsByNames(['educación', 'educacion', 'education'])" class="entry">
              <div class="entry-header">
                <span class="entry-dates" *ngIf="item.fechaInicio || item.fechaFin">
                  {{ item.fechaInicio || '' }} {{ item.fechaInicio && item.fechaFin ? '-' : '' }} {{ item.fechaFin || 'Presente' }}
                </span>
                <h3 class="entry-title">{{ item.titulo }}</h3>
              </div>
              <p class="entry-description" *ngIf="item.descripcion">{{ item.descripcion }}</p>
              <p class="entry-extra" *ngIf="item.extra">{{ item.extra }}</p>
            </div>
          </ng-container>
          <ng-template #eduPlaceholder>
            <div class="placeholder-content">
              <div class="placeholder-section">
                <div class="education-list">
                  <div class="education-item">
                    <strong>Universidad Tecnológica del Perú (UTP) – Chiclayo, Perú</strong>
                    <div>Ingeniería de Sistemas e Informática</div>
                    <small>Año de inicio: 2021 – Actualidad</small>
                  </div>

                  <div class="education-item">
                    <strong>Colegio 2024 Alberto Fujimori – Los Olivos, Lima, Perú</strong>
                    <div>Educación Primaria y Secundaria</div>
                    <small>Año de inicio: 2014 – Año de finalización: 2020</small>
                  </div>
                </div>
              </div>
            </div>
          </ng-template>
        </div>
      </section>

      <div class="section-divider"></div>

      <!-- Habilidades (siempre visible) -->
      <section class="cv-section-row">
        <div class="section-left">
          <h2 class="section-heading">Habilidades</h2>
        </div>
        <div class="section-right">
          <ng-container *ngIf="getItemsByNames(['habilidades', 'habilidad', 'skills']).length > 0; else skillsPlaceholder">
            <ul class="skills-list">
              <li *ngFor="let item of getItemsByNames(['habilidades', 'habilidad', 'skills'])">
                {{ item.titulo || item.descripcion }}
              </li>
            </ul>
          </ng-container>
          <ng-template #skillsPlaceholder>
            <div class="placeholder-content">
              <div class="placeholder-section">
                <ul class="skills-list placeholder-skills-list">
                  <li>Frontend: HTML, CSS, JavaScript, React, Angular</li>
                  <li>Backend: Node.js, Java, PHP, Spring Boot</li>
                  <li>Trabajo en equipo: Colaboración efectiva en proyectos universitarios y en equipos multidisciplinarios.</li>
                  <li>Comunicación: Habilidad para explicar ideas técnicas y documentar proyectos.</li>
                  <li>Aprendizaje constante: Motivación por adquirir nuevas tecnologías y mejorar habilidades técnicas.</li>
                  <li>Resolución de problemas: Capacidad de analizar retos y desarrollar soluciones eficientes.</li>
                </ul>
              </div>

              
            </div>
          </ng-template>
        </div>
      </section>

      <!-- Otras secciones si existen (excluyendo las principales) -->
  <ng-container *ngFor="let seccion of (cv?.secciones || [])">
        <ng-container *ngIf="!isMainSection(seccion.nombre)">
          <div class="section-divider"></div>
          <section class="cv-section-row">
            <div class="section-left">
              <h2 class="section-heading">{{ seccion.nombre }}</h2>
            </div>
            <div class="section-right">
              <div *ngFor="let item of seccion.items" class="entry">
                <div class="entry-header">
                  <span class="entry-dates" *ngIf="item.fechaInicio || item.fechaFin">
                    {{ item.fechaInicio || '' }} {{ item.fechaInicio && item.fechaFin ? '-' : '' }} {{ item.fechaFin || 'Presente' }}
                  </span>
                  <h3 class="entry-title">{{ item.titulo }}</h3>
                </div>
                <p class="entry-description" *ngIf="item.descripcion">{{ item.descripcion }}</p>
                <p class="entry-extra" *ngIf="item.extra">{{ item.extra }}</p>
              </div>
            </div>
          </section>
        </ng-container>
      </ng-container>
    </div>

    <div *ngIf="!cv" class="loading">
      <div class="spinner"></div>
      <p>Cargando currículum...</p>
    </div>
  `
})
export class CvCurriculumComponent implements OnInit {
    cv?: CvFull;

    constructor(private cvService: CvService) { }

    ngOnInit(): void {
        this.cvService.getCvSummary().subscribe({
            next: (cvSummary) => {
                if (cvSummary?.id) {
                    this.cvService.getCvComplete(cvSummary.id).subscribe({
                        next: (cvFull) => this.cv = cvFull,
                        error: (err) => console.error('Error al cargar CV:', err)
                    });
                }
            },
            error: (err) => {
                console.error('Error al cargar CV:', err);
                this.cvService.getCvComplete(1).subscribe({
                    next: (cvFull) => this.cv = cvFull,
                    error: (err2) => console.error('Error fallback:', err2)
                });
            }
        });
    }

    getSeccionByNombre(nombre: string) {
        return this.cv?.secciones?.find(s =>
            s.nombre.toLowerCase() === nombre.toLowerCase()
        );
    }

    /**
     * Devuelve todos los ítems de las secciones cuyos nombres coincidan (insensible a mayúsculas)
     * Acepta múltiples variantes (por ejemplo ['educación','educacion','education']).
     */
    getItemsByNames(names: string[]) {
        if (!this.cv?.secciones) return [];
        const lowerNames = names.map(n => n.toLowerCase());
        const items: any[] = [];
        for (const s of this.cv.secciones) {
            if (s?.nombre && lowerNames.includes(s.nombre.toLowerCase())) {
                if (Array.isArray(s.items)) items.push(...s.items);
            }
        }
        return items;
    }

    /**
     * Indica si el nombre de la sección corresponde a una de las secciones principales
     */
    isMainSection(nombre: string) {
        if (!nombre) return false;
        const n = nombre.toLowerCase();
        const mains = ['experiencia', 'experiencia laboral', 'educación', 'educacion', 'education', 'habilidades', 'habilidad', 'skills'];
        return mains.includes(n);
    }
}
