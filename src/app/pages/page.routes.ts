import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { PackagesComponent } from './packages/packages.component';

const pagesRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'packages', component: PackagesComponent }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
