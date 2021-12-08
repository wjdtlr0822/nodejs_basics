import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ProjectComponent } from './component/project/project.component';
import { RegisterComponent } from './component/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import {CertComponent} from './component/cert/cert.component'
import {ListComponent} from './component/list/list.component'
import { QrgenComponent } from './component/qrgen/qrgen.component';
import { QrloginComponent } from './component/qrlogin/qrlogin.component';
import { DownloadComponent } from './component/download/download.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'navbar',component:NavbarComponent},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'register',component:RegisterComponent},
  {path:'project',component:ProjectComponent},
  {path:'cert',component:CertComponent,canActivate:[AuthGuard]},
  {path:'list',component:ListComponent,canActivate:[AuthGuard]},
  {path:'qrgen',component:QrgenComponent,canActivate:[AuthGuard]},
  {path:'qrlogin',component:QrloginComponent},
  {path:'down',component:DownloadComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
