import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MainComponent } from './main/main.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { OrdersComponent } from './components/orders/orders.component';


const routes: Routes = [
  { path: 'dashboard', component: MainComponent,
  children: [
      { path: '', redirectTo: 'dashboard-main', pathMatch: 'full'},
      { path: 'dashboard-main', component: OrdersComponent},
      { path: 'product-list', component: ProductListComponent},
      { path: 'product-detail', component: ProductDetailComponent},
      { path: 'user-list', component: UserListComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
