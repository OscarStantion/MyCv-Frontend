import type { CvFull } from '../models/cv.model';

export const STATIC_CV: CvFull = {
  id: 1,
  nombre: 'Oscar Jean Carlos Farroñan Diaz',
  profesion: 'Desarrollador Full Stack',
  descripcion: 'Desarrollador web entusiasta, con experiencia en la creación de aplicaciones modernas y funcionales. Motivado por los desafíos tecnológicos y el aprendizaje continuo.',
  fotoUrl: 'assets/FotoPerfil.jpeg',
  secciones: [
    {
      nombre: 'Experiencia',
      items: [
        {
          titulo: 'DESARROLLADOR WEB - Proyecto clínico',
          descripcion: 'Proyecto universitario de registro de sangre para clínica. Colaboración en equipo para desarrollar un sistema de registro de muestras sanguíneas.',
          extra: 'Tecnologías: Java, MySQL, HTML, CSS, JavaScript.',
          fechaInicio: '2023',
          fechaFin: '2023'
        },
        {
          titulo: 'DESARROLLADOR WEB - Proyecto colegio',
          descripcion: 'Página web institucional para colegio con gestión de reclamos y comunicados.',
          extra: 'Tecnologías: PHP, HTML, CSS, JavaScript, MySQL.',
          fechaInicio: '2022',
          fechaFin: '2022'
        },
        {
          titulo: 'DESARROLLADOR WEB - Reservas de canchas',
          descripcion: 'Sistema de reservas de canchas deportivas con gestión de disponibilidad y usuarios.',
          extra: 'Tecnologías: Angular, TypeScript, Tailwind, PostgreSQL.',
          fechaInicio: '2021',
          fechaFin: '2021'
        }
      ]
    },
    {
      nombre: 'Educación',
      items: [
        {
          titulo: 'Ingeniería de Sistemas e Informática - UTP (Chiclayo)',
          descripcion: '',
          extra: '2021 - Actualidad'
        },
        {
          titulo: 'Educación Secundaria - Colegio 2024 Alberto Fujimori',
          descripcion: '',
          extra: '2014 - 2020'
        }
      ]
    },
    {
      nombre: 'Habilidades',
      items: [
        { titulo: 'Frontend: HTML, CSS, JavaScript, React, Angular' },
        { titulo: 'Backend: Node.js, Java, PHP, Spring Boot' },
        { titulo: 'Trabajo en equipo y comunicación' },
        { titulo: 'Resolución de problemas y aprendizaje continuo' }
      ]
    }
  ]
};

export const STATIC_CV_SUMMARY = {
  id: STATIC_CV.id,
  nombre: STATIC_CV.nombre,
  profesion: STATIC_CV.profesion,
  descripcion: STATIC_CV.descripcion,
  fotoUrl: STATIC_CV.fotoUrl
};

export default STATIC_CV;
