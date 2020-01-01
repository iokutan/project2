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
    { path: 'uhren-reparatur', component: WatchRepairComponent},
    { path: 'schmuck-reparatur', component: JeweleryRepairComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
