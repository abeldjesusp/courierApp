import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';

// GUARD
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'panel',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    loadChildren: './pages/page.module#PageModule',
  },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
