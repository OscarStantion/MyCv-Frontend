import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./cv/cv-view.component').then(m => m.CvViewComponent)
	},
	{
		path: 'curriculum',
		loadComponent: () => import('./cv/cv-curriculum.component').then(m => m.CvCurriculumComponent)
	},
	{
		path: 'proyectos',
		loadComponent: () => import('./projects/projects.component').then(m => m.ProjectsComponent)
	},
	{
		path: 'contacto',
		loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent)
	},
	{
		path: 'cv/create',
		loadComponent: () => import('./cv/cv-edit.component').then(m => m.CvEditComponent)
	},
	{
		path: 'cv/:id',
		loadComponent: () => import('./cv/cv-full.component').then(m => m.CvFullComponent)
	},
		{
			path: 'cv/:id/secciones',
			loadComponent: () => import('./cv/section-list.component').then(m => m.SectionListComponent)
		},
		{
			path: 'cv/:id/secciones/create',
			loadComponent: () => import('./cv/section-edit.component').then(m => m.SectionEditComponent)
		},
		{
			path: 'secciones/:id/edit',
			loadComponent: () => import('./cv/section-edit.component').then(m => m.SectionEditComponent)
		},
		{
			path: 'secciones/:id/items',
			loadComponent: () => import('./cv/section-items.component').then(m => m.SectionItemsComponent)
		},
		{
			path: 'secciones/:id/items/create',
			loadComponent: () => import('./cv/item-edit.component').then(m => m.ItemEditComponent)
		},
		{
			path: 'secciones/:id/items/:itemId/edit',
			loadComponent: () => import('./cv/item-edit.component').then(m => m.ItemEditComponent)
		},
	{
		path: 'cv/:id/edit',
		loadComponent: () => import('./cv/cv-edit.component').then(m => m.CvEditComponent)
	}
];
