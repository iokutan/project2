import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormPurchaseGoldComponent } from './components/form-purchase-gold/form-purchase-gold.component';
import { FormPurchaseWatchComponent } from './components/form-purchase-watch/form-purchase-watch.component';
import { FormDemandComponent } from './components/form-demand/form-demand.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ServicesComponent } from './pages/services/services.component';
import { WatchRepairComponent } from './pages/services/watch-repair/watch-repair.component';
import { JeweleryRepairComponent } from './pages/services/jewelery-repair/jewelery-repair.component';
import { ServiceMainComponent } from './pages/services/service-main/service-main.component';
import { SalesMainComponent } from './pages/sales/sales-main/sales-main.component';
import { SaleUhrenComponent } from './pages/sales/sale-uhren/sale-uhren.component';
import { SaleSchmuckComponent } from './pages/sales/sale-schmuck/sale-schmuck.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'gold-ankauf', component: FormPurchaseGoldComponent},
  { path: 'uhren-ankauf', component: FormPurchaseWatchComponent},
  { path: 'offerte', component: FormDemandComponent},
  { path: 'tracking', component: TrackingComponent},
  { path: 'appointment', component: AppointmentComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'services', component: ServicesComponent,
  children: [
    { path: '', redirectTo: 'service-main', pathMatch: 'full'},
    { path: 'service-main', component: ServiceMainComponent},
    { path: 'uhren-reparatur', component: WatchRepairComponent},
    { path: 'schmuck-reparatur', component: JeweleryRepairComponent}
  ]},
  { path: 'sales', component: ServicesComponent,
  children: [
    { path: '', redirectTo: 'sale-main', pathMatch: 'full'},
    { path: 'sale-main', component: SalesMainComponent},
    { path: 'sale-uhren', component: SaleUhrenComponent},
    { path: 'sale-schmuck', component: SaleSchmuckComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
