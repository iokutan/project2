import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/pages/home/home.component';
import { ProductDetailComponent } from './dashboard/components/product-detail/product-detail.component';
import { MainComponent } from './dashboard/main/main.component';
import { ProductListComponent } from './dashboard/components/product-list/product-list.component';
import { UserListComponent } from './dashboard/components/user-list/user-list.component';

/*
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'dashboard', component: HomeComponent,
  children: [
      { path: '', redirectTo: 'dashboard-main', pathMatch: 'full'},
      { path: 'dashboard-main', component: MainComponent},
      { path: 'product-list', component: ProductListComponent},
      { path: 'product-detail', component: ProductDetailComponent},
      { path: 'user-list', component: UserListComponent}
  ]}
];
*/
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
