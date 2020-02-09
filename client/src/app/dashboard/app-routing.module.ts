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
import { InboxComponent } from './components/inbox/inbox.component';
import { InboxDetailComponent } from './components/inbox-detail/inbox-detail.component';
import { IsAuthorizedGuard } from './services/authorized-guard.service';
import { CategoryComponent } from './components/category/category.component';
import { CategoryUpdateComponent } from './components/category/category-update/category-update.component';
import { CategoryNewComponent } from './components/category/category-new/category-new.component';
import { ModelComponent } from './components/model/model.component';
import { ModelNewComponent } from './components/model/model-new/model-new.component';
import { ModelUpdateComponent } from './components/model/model-update/model-update.component';


const routes: Routes = [
  { path: 'dashboard', component: MainComponent,
  canActivate: [IsAuthorizedGuard],
  children: [
      { path: '', redirectTo: 'dashboard-main', pathMatch: 'full'},
      { path: 'dashboard-main', component: OrdersComponent},
      { path: 'product-list', component: ProductListComponent},
      { path: 'product-detail', component: ProductDetailComponent},
      { path: 'user-list', component: UserListComponent},
      { path: 'news-list', component: NewsComponent},
      { path: 'category-list', component: CategoryComponent},
      { path: 'category-update/:id', component: CategoryUpdateComponent},
      { path: 'category-new', component: CategoryNewComponent},
      { path: 'news-detail', component: NewsDetailComponent},
      { path: 'order-detail', component: OrdersDetailComponent},
      { path: 'order-detail/:id', component: OrdersDetailComponent},
      { path: 'model-list', component: ModelComponent},
      { path: 'model-new', component: ModelNewComponent},
      { path: 'model-update/:id', component: ModelUpdateComponent},
      { path: 'user-detail', component: UserDetailComponent},
      { path: 'inbox-list', component: InboxComponent},
      { path: 'inbox-detail', component: InboxDetailComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
