import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { HomeComponent } from './pages/home/home.component';
import { InfoBoxComponent } from './components/info-box/info-box.component';
import { SliderComponent } from './components/slider/slider.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './pages/login/login.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { FormComponent } from './components/form/form.component';

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
    FormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
