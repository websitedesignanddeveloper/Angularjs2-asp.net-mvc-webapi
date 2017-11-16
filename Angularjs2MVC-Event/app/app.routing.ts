import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { EventComponent } from './components/event.component';

const appRoutes: Routes = [
	{ path: '', redirectTo: 'event', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'event', component: EventComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);