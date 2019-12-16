import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormPurchaseGoldComponent } from './components/form-purchase-gold/form-purchase-gold.component';
import { FormPurchaseWatchComponent } from './components/form-purchase-watch/form-purchase-watch.component';
import { FormDemandComponent } from './components/form-demand/form-demand.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'offerte-g', component: FormPurchaseGoldComponent},
  { path: 'offerte-w', component: FormPurchaseWatchComponent},
  { path: 'offerte-d', component: FormDemandComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
