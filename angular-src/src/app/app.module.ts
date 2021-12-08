import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProfileComponent } from './component/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { ValidateService } from './services/validate.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import {HttpClientModule} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth.guard';
import { ProjectComponent } from './component/project/project.component';
import { CertComponent } from './component/cert/cert.component';
import { ListComponent } from './component/list/list.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { QrgenComponent } from './component/qrgen/qrgen.component';
import { QrloginComponent } from './component/qrlogin/qrlogin.component';
import { DownloadComponent } from './component/download/download.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ProjectComponent,
    CertComponent,
    ListComponent,
    QrgenComponent,
    QrloginComponent,
    DownloadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>{
          return localStorage.getItem('authToken');
        }
      }
    }), //모듈 임포트 tokenGetter 함수는 로컬스토리지에서 토큰을 읽어오는 기능,
    NgxQRCodeModule
  ],
  providers: [ValidateService,FlashMessagesService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
