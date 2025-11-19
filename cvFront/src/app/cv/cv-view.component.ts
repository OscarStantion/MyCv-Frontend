import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CvService } from '../services/cv.service';
import type { CvFull } from '../models/cv.model';

@Component({
  selector: 'app-cv-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="cv" class="portfolio-container">
      <!-- Hero Section con diseño split -->
      <div class="hero-section">
        <!-- Lado Izquierdo: Círculo con foto -->
        <div class="hero-left">
          <!-- Photo circle: only asset fallback. Upload from UI disabled. -->
            <div class="photo-circle" title="Foto" (contextmenu)="$event.preventDefault()">
              <img [src]="assetFallback" alt="Foto profesional" (contextmenu)="$event.preventDefault()" />
            </div>
        </div>

        <!-- Lado Derecho: Contenido de texto -->
        <div class="hero-right">
          <h1 class="hero-title">Hola</h1>
          <h2 class="hero-subtitle">Un poco de mí</h2>
          <p class="hero-description">{{ cv.descripcion || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }}</p>
          
          <!-- Botones circulares de CTA -->
          <div class="cta-buttons">
            <button class="cta-circle cta-yellow" (click)="goToCurriculum()">Currículum</button>
            <button class="cta-circle cta-red" (click)="goToProjects()">Proyectos</button>
            <button class="cta-circle cta-cyan-alt" (click)="goToContact()">Contacto</button>
          </div>
        </div>
      </div>

      <!-- Secciones del CV eliminadas del homepage por petición del usuario -->
    </div>
    
    <div *ngIf="!cv" class="loading">
      <div class="spinner"></div>
      <p>Cargando CV...</p>
    </div>
  `
})
export class CvViewComponent implements OnInit {
  cv?: CvFull;
  // No client-side upload/preview: hero image is read-only and uses an asset fallback
  // If user added an image to src/assets, use it as a local default fallback
  assetFallback = 'assets/FotoPerfil.jpeg';

  constructor(private cvService: CvService, private router: Router) {}

  ngOnInit(): void {
    // Primero intentamos obtener el primer CV disponible
    this.cvService.getCvSummary().subscribe({ 
      next: (cvSummary) => {
        if (cvSummary?.id) {
          // Si tenemos un CV, cargamos la versión completa
          this.cvService.getCvComplete(cvSummary.id).subscribe({
            next: (cvFull) => this.cv = cvFull,
            error: (err) => console.error('Error al cargar CV completo:', err)
          });
        } else {
          console.error('No se encontró ningún CV');
        }
      },
      error: (err) => {
        console.error('Error al cargar CV:', err);
        // Intenta cargar directamente con ID 1 como fallback
        this.cvService.getCvComplete(1).subscribe({
          next: (cvFull) => this.cv = cvFull,
          error: (err2) => console.error('Error fallback:', err2)
        });
      }
    });
  }

  resolveFotoUrl(url: string) {
    if (!url) return '';
    // If the URL is a data URL (client-side preview), return it as-is.
    if (url.startsWith('data:')) return url;
    // If it's an asset path, return as-is (no host prefix needed)
    if (url.startsWith('assets') || url.startsWith('/assets')) return url.replace(/^\//, '');
    // Si la URL es inválida o placeholder, retornar una imagen por defecto o vacío
    if (url === 'https://foto.jpg/' || url === 'foto.jpg' || !url.includes('/')) {
      return ''; // No mostrar imagen si es inválida
    }
    return url.startsWith('http') ? url : `http://localhost:8080${url}`;
  }
  // Upload via UI disabled: no triggerFileInput/onFileSelected methods remain.

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private startTransitionThenNavigate(path: string) {
    // Try to trigger the route container fade-out immediately for a smoother UX
    try {
      const el = document.getElementById('route-container');
      if (el) {
        el.classList.remove('route-fade-in');
        // ensure enter class removed, then add exit class
        void el.offsetWidth;
        el.classList.add('route-fade-out');
      }
    } catch (e) {
      // ignore
    }
    // Small delay so the exit animation is visible before navigation begins
    setTimeout(() => this.router.navigate([path]), 110);
  }

  goToCurriculum(): void {
    this.startTransitionThenNavigate('/curriculum');
  }

  goToProjects(): void {
    this.startTransitionThenNavigate('/proyectos');
  }

  goToContact(): void {
    this.startTransitionThenNavigate('/contacto');
  }
}
