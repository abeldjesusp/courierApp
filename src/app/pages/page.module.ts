import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Router
import { PAGES_ROUTES } from './page.routes';

// Pages
import { HomeComponent } from './home/home.component';
import { PackagesComponent } from './packages/packages.component';

@NgModule({
  declarations: [
    HomeComponent,
    PackagesComponent
  ],
  imports: [
    CommonModule,
    PAGES_ROUTES
  ],
  providers: [
  ]
})
export class PageModule { }
