import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { OrdersComponent } from './components/orders/orders.component';
import { IsAuthorizedGuard } from './services/authorized-guard.service';
import { CategoryComponent } from './components/category/category.component';
import { CategoryUpdateComponent } from './components/category/category-update/category-update.component';
import { CategoryNewComponent } from './components/category/category-new/category-new.component';
import { ModelComponent } from './components/model/model.component';
import { ModelNewComponent } from './components/model/model-new/model-new.component';
import { ModelUpdateComponent } from './components/model/model-update/model-update.component';
import { ProductComponent } from './components/product/product.component';
import { ProductNewComponent } from './components/product/product-new/product-new.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductServicesComponent } from './components/product-services/product-services.component';
import { ServiceNewComponent } from './components/product-services/service-new/service-new.component';
import { ServiceUpdateComponent } from './components/product-services/service-update/service-update.component';


const routes: Routes = [
  { path: 'dashboard', component: MainComponent,
  canActivate: [IsAuthorizedGuard],
  children: [
      { path: '', redirectTo: 'dashboard-main', pathMatch: 'full'},
      { path: 'dashboard-main', component: OrdersComponent},
      { path: 'category-list', component: CategoryComponent},
      { path: 'category-update/:id', component: CategoryUpdateComponent},
      { path: 'category-new', component: CategoryNewComponent},
      { path: 'model-list', component: ModelComponent},
      { path: 'model-new', component: ModelNewComponent},
      { path: 'model-update/:id', component: ModelUpdateComponent},
      { path: 'product-list', component: ProductComponent},
      { path: 'product-new', component: ProductNewComponent},
      { path: 'product-update/:id', component: ProductUpdateComponent},
      { path: 'service-list', component: ProductServicesComponent},
      { path: 'service-new', component: ServiceNewComponent},
      { path: 'service-update/:id', component: ServiceUpdateComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
