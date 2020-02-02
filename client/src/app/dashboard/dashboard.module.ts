import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NewsComponent } from './components/news/news.component';
import { OrdersComponent } from './components/orders/orders.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { OrdersDetailComponent } from './components/orders-detail/orders-detail.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { MainComponent } from './main/main.component';
import { DashNavComponent } from './components/dash-nav/dash-nav.component';
import { DashHeaderComponent } from './components/dash-header/dash-header.component';
import { DashboardRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    ProductListComponent,
    UserListComponent,
    NewsComponent,
    OrdersComponent,
    NewsDetailComponent,
    OrdersDetailComponent,
    ProductDetailComponent,
    UserDetailComponent,
    MainComponent,
    DashNavComponent,
    DashHeaderComponent],

    imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
