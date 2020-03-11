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
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { ProductServicesComponent } from './components/product-services/product-services.component';
import { ServiceNewComponent } from './components/product-services/service-new/service-new.component';
import { ServiceUpdateComponent } from './components/product-services/service-update/service-update.component';
import { ProductOfferService } from './services/product-offer.service';
import { ArtikelsComponent } from './components/artikels/artikels.component';
import { ArtikelNewComponent } from './components/artikels/artikel-new/artikel-new.component';
import { ArtikelUpdateComponent } from './components/artikels/artikel-update/artikel-update.component';
import { ArtikelService } from './services/artikel.service';
import { ArtikelCategoryComponent } from './components/artikel-category/artikel-category.component';
import { ArtikelCategoryNewComponent } from './components/artikel-category/artikel-category-new/artikel-category-new.component';
import { ArtikelCategoryUpdateComponent } from './components/artikel-category/artikel-category-update/artikel-category-update.component';
import { ArtikelCategoryService } from './services/artikel-category.service';
import { OrdersUpdateComponent } from './components/orders/orders-update/orders-update.component';
import { OrdersNewComponent } from './components/orders/orders-new/orders-new.component';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';


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
    ProductUpdateComponent,
    ImageUploaderComponent,
    ProductServicesComponent,
    ServiceNewComponent,
    ServiceUpdateComponent,
    ArtikelsComponent,
    ArtikelNewComponent,
    ArtikelUpdateComponent,
    ArtikelCategoryComponent,
    ArtikelCategoryNewComponent,
    ArtikelCategoryUpdateComponent,
    OrdersUpdateComponent,
    OrdersNewComponent,
    DashboardMainComponent,
  ],
  providers: [
    IsAuthorizedGuard,
    CategoryService,
    ModelService,
    ProductService,
    ProductOfferService,
    ArtikelService,
    ArtikelCategoryService,
  ], 
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
