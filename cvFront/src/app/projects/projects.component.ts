import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="projects-page">
      <h1 class="page-title">Proyectos</h1>

      <div class="project-row">
        <div class="project-left">
          <h3 class="project-title">Sistema de registro de sangre para clínica</h3>
          <p class="project-description">Participación en un proyecto universitario para desarrollar un sistema de registro de muestras sanguíneas de pacientes. <br>
                                            El sistema permite registrar resultados de laboratorio, generar reportes y emitir resultados impresos de manera eficiente y organizada. <br>
                                            Tecnologías utilizadas: Java, MySQL, HTML, CSS, JavaScript.<br>
                                            Aprendizajes: trabajo en equipo, manejo de bases de datos y desarrollo de funcionalidades críticas para un entorno clínico.</p>
        </div>
        <div class="project-right">
          <img src="assets/Proyc1.png" alt="Proyecto 01 - Clínica" />
        </div>
      </div>

      <div class="project-row">
        <div class="project-left">
          <h3 class="project-title">Página web para colegio</h3>
          <p class="project-description">Desarrollo de una página web institucional que permite enviar reclamos, actualizar fechas importantes y enviar comunicados a estudiantes y padres.<br>
                                            El proyecto involucró diseño de interfaz amigable, integración con base de datos y comunicación con el usuario final.<br>
                                            Tecnologías utilizadas: PHP, HTML, CSS, JavaScript, MySQL.<br>
                                            Aprendizajes: desarrollo full-stack, interacción con usuarios y trabajo colaborativo en equipo.</p>
        </div>
        <div class="project-right">
          <img src="assets/Proyc2.jpeg" alt="Proyecto 02 - Colegio" />
        </div>
      </div>

      <div class="project-row">
        <div class="project-left">
          <h3 class="project-title">Sistema de reservas de canchas deportivas</h3>
          <p class="project-description">Creación de un sistema web que permite a los usuarios reservar canchas deportivas, visualizar disponibilidad en tiempo real y gestionar reservas de manera segura.<br>
                                            Se incluyeron funcionalidades como gestión de usuarios, visualización de horarios y control de disponibilidad de canchas.<br>
                                            Tecnologías utilizadas: Angular, TypeScript, Tailwind, PostgreSQL.<br>
                                            Aprendizajes: desarrollo moderno en Angular, diseño responsive y manejo de bases de datos relacionales.</p>
        </div>
        <div class="project-right">
          <img src="assets/Proyc3.jpeg" alt="Proyecto 03 - Canchas Deportivas" />
        </div>
      </div>
    </div>
  `
})
export class ProjectsComponent {}
