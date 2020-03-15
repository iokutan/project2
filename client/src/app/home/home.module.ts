
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeMainComponent } from './pages/home-main/home-main.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { HomeComponent } from './pages/home/home.component';
import { InfoBoxComponent } from './components/info-box/info-box.component';
import { SliderComponent } from './components/slider/slider.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './pages/login/login.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { FormDemandComponent } from './components/form-demand/form-demand.component';
import { FormPurchaseGoldComponent } from './components/form-purchase-gold/form-purchase-gold.component';
import { FormPurchaseWatchComponent } from './components/form-purchase-watch/form-purchase-watch.component';
import { FormContactComponent } from './components/form-contact/form-contact.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { WatchRepairComponent } from './pages/services/watch-repair/watch-repair.component';
import { JeweleryRepairComponent } from './pages/services/jewelery-repair/jewelery-repair.component';
import { ServiceMainComponent } from './pages/services/service-main/service-main.component';
import { SalesComponent } from './pages/sales/sales.component';
import { SalesMainComponent } from './pages/sales/sales-main/sales-main.component';
import { SaleUhrenComponent } from './pages/sales/sale-uhren/sale-uhren.component';
import { SaleSchmuckComponent } from './pages/sales/sale-schmuck/sale-schmuck.component';
import { AktuelComponent } from './pages/aktuel/aktuel.component';
import { HomePageRoutesModule } from './app-routing.module';

@NgModule({
  declarations: [
    HomeMainComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    MainMenuComponent,
    HomeComponent,
    InfoBoxComponent,
    SliderComponent,
    SidebarComponent,
    LoginComponent,
    SingUpComponent,
    FormDemandComponent,
    FormPurchaseGoldComponent,
    FormPurchaseWatchComponent,
    FormContactComponent,
    TrackingComponent,
    AppointmentComponent,
    ServicesComponent,
    ContactComponent,
    WatchRepairComponent,
    JeweleryRepairComponent,
    ServiceMainComponent,
    SalesComponent,
    SalesMainComponent,
    SaleUhrenComponent,
    SaleSchmuckComponent,
    AktuelComponent
  ],
  imports: [
    HttpClientModule,
    HomePageRoutesModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    NgbModule
  ]
})
export class HomeModule { }
