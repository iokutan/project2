import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MainComponent } from './main/main.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { OrdersComponent } from './components/orders/orders.component';
import { NewsComponent } from './components/news/news.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { OrdersDetailComponent } from './components/orders-detail/orders-detail.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';


const routes: Routes = [
  { path: 'dashboard', component: MainComponent,
  children: [
      { path: '', redirectTo: 'dashboard-main', pathMatch: 'full'},
      { path: 'dashboard-main', component: OrdersComponent},
      { path: 'product-list', component: ProductListComponent},
      { path: 'product-detail', component: ProductDetailComponent},
      { path: 'user-list', component: UserListComponent},
      { path: 'news-list', component: NewsComponent},
      { path: 'news-detail', component: NewsDetailComponent},
      { path: 'order-detail', component: OrdersDetailComponent},
      { path: 'user-detail', component: UserDetailComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
