import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePagesComponent } from './pages/home-pages/home-pages.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, HomePagesComponent, ProductListComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ngshop';
}
