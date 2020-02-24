import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './components/orders/orders.component';
import { MainComponent } from './main/main.component';
import { DashNavComponent } from './components/dash-nav/dash-nav.component';
import { DashHeaderComponent } from './components/dash-header/dash-header.component';
import { DashboardRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IsAuthorizedGuard } from './services/authorized-guard.service';
import { CategoryComponent } from './components/category/category.component';
import { CategoryNewComponent } from './components/category/category-new/category-new.component';
import { CategoryUpdateComponent } from './components/category/category-update/category-update.component';
import { CategoryService } from './services/category.service';
import { ModelComponent } from './components/model/model.component';
import { ModelNewComponent } from './components/model/model-new/model-new.component';
import { ModelUpdateComponent } from './components/model/model-update/model-update.component';
import { ModelService } from './services/model.service';
import { ProductComponent } from './components/product/product.component';
import { ProductNewComponent } from './components/product/product-new/product-new.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductService } from './services/product.service';


@NgModule({
  declarations: [
    OrdersComponent,
    MainComponent,
    DashNavComponent,
    DashHeaderComponent,
    CategoryComponent,
    CategoryNewComponent,
    CategoryUpdateComponent,
    ModelComponent,
    ModelNewComponent,
    ModelUpdateComponent,
    ProductComponent,
    ProductNewComponent,
    ProductUpdateComponent
  ],
  providers: [
    IsAuthorizedGuard,
    CategoryService,
    ModelService,
    ProductService
  ], 
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
