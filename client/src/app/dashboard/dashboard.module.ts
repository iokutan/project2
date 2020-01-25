import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NewsComponent } from './components/news/news.component';
import { OrdersComponent } from './components/orders/orders.component';



@NgModule({
  declarations: [ProductListComponent, UserListComponent, NewsComponent, OrdersComponent],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
