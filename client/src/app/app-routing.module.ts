import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/pages/home/home.component';
import { LoginComponent } from './home/pages/login/login.component';
import { FormPurchaseGoldComponent } from './home/components/form-purchase-gold/form-purchase-gold.component';
import { FormPurchaseWatchComponent } from './home/components/form-purchase-watch/form-purchase-watch.component';
import { FormDemandComponent } from './home/components/form-demand/form-demand.component';
import { TrackingComponent } from './home/components/tracking/tracking.component';
import { AppointmentComponent } from './home/components/appointment/appointment.component';
import { ContactComponent } from './home/pages/contact/contact.component';
import { ServicesComponent } from './home/pages/services/services.component';
import { WatchRepairComponent } from './home/pages/services/watch-repair/watch-repair.component';
import { JeweleryRepairComponent } from './home/pages/services/jewelery-repair/jewelery-repair.component';
import { ServiceMainComponent } from './home/pages/services/service-main/service-main.component';
import { SalesMainComponent } from './home/pages/sales/sales-main/sales-main.component';
import { SaleUhrenComponent } from './home/pages/sales/sale-uhren/sale-uhren.component';
import { SaleSchmuckComponent } from './home/pages/sales/sale-schmuck/sale-schmuck.component';
import { AktuelComponent } from './home/pages/aktuel/aktuel.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'aktuel', component: AktuelComponent},
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
