import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DashboardModule } from './dashboard/dashboard.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/components/header/header.component';
import { ContentComponent } from './home/components/content/content.component';
import { FooterComponent } from './home/components/footer/footer.component';
import { ChatComponent } from './home/components/chat/chat.component';
import { MainMenuComponent } from './home/components/main-menu/main-menu.component';
import { HomeComponent } from './home/pages/home/home.component';
import { InfoBoxComponent } from './home/components/info-box/info-box.component';
import { SliderComponent } from './home/components/slider/slider.component';
import { SidebarComponent } from './home/components/sidebar/sidebar.component';
import { LoginComponent } from './home/pages/login/login.component';
import { SingUpComponent } from './home/components/sing-up/sing-up.component';
import { FormDemandComponent } from './home/components/form-demand/form-demand.component';
import { FormPurchaseGoldComponent } from './home/components/form-purchase-gold/form-purchase-gold.component';
import { FormPurchaseWatchComponent } from './home/components/form-purchase-watch/form-purchase-watch.component';
import { FormContactComponent } from './home/components/form-contact/form-contact.component';
import { TrackingComponent } from './home/components/tracking/tracking.component';
import { AppointmentComponent } from './home/components/appointment/appointment.component';
import { ServicesComponent } from './home/pages/services/services.component';
import { ContactComponent } from './home/pages/contact/contact.component';
import { WatchRepairComponent } from './home/pages/services/watch-repair/watch-repair.component';
import { JeweleryRepairComponent } from './home/pages/services/jewelery-repair/jewelery-repair.component';
import { ServiceMainComponent } from './home/pages/services/service-main/service-main.component';
import { SalesComponent } from './home/pages/sales/sales.component';
import { SalesMainComponent } from './home/pages/sales/sales-main/sales-main.component';
import { SaleUhrenComponent } from './home/pages/sales/sale-uhren/sale-uhren.component';
import { SaleSchmuckComponent } from './home/pages/sales/sale-schmuck/sale-schmuck.component';
import { AktuelComponent } from './home/pages/aktuel/aktuel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ChatComponent,
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
    AktuelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
