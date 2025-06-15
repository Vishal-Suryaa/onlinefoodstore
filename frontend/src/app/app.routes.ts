import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FoodDetailComponent } from './components/pages/food-detail/food-detail.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'search/:searchTerm',
    component: HomeComponent,
  },
  {
    path: 'tag/:tag',
    component: HomeComponent,
  },
  {
    path: 'food/:id',
    component: FoodDetailComponent,
  },
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
];
