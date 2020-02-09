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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InboxComponent } from './components/inbox/inbox.component';
import { InboxDetailComponent } from './components/inbox-detail/inbox-detail.component';
import { IsAuthorizedGuard } from './services/authorized-guard.service';
import { CategoryComponent } from './components/category/category.component';
import { CategoryNewComponent } from './components/category/category-new/category-new.component';
import { CategoryUpdateComponent } from './components/category/category-update/category-update.component';
import { CategoryService } from './services/category.service';
import { ModelComponent } from './components/model/model.component';
import { ModelNewComponent } from './components/model/model-new/model-new.component';
import { ModelUpdateComponent } from './components/model/model-update/model-update.component';
import { ModelService } from './services/model.service';


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
    DashHeaderComponent,
    InboxComponent,
    InboxDetailComponent,
    CategoryComponent,
    CategoryNewComponent,
    CategoryUpdateComponent,
    ModelComponent,
    ModelNewComponent,
    ModelUpdateComponent
  ],
  providers: [
    IsAuthorizedGuard,
    CategoryService,
    ModelService
  ], 
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
