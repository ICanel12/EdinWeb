import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { QrcodeComponent } from './components/qrcode/qrcode.component';
import { HomeComponent } from './components/home/home.component';
import { LoginGuard } from './guards/login.guard';
import { OperationsComponent } from './components/operations/operations.component';
import { DetailsComponent } from './components/details/details.component';
import { PrincipalComponent } from './components/principal/principal.component';

const routes: Routes = [
  { path: 'principal', component: PrincipalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'qr-code', component: QrcodeComponent, canActivate: [LoginGuard] },
  { path: 'home', component: HomeComponent, canActivate: [LoginGuard]},
  { path: "details/:idOperation", component: DetailsComponent, canActivate: [LoginGuard]},
  { path: 'operations/:idModule', component: OperationsComponent, canActivate: [LoginGuard]},
  { path: 'statistics/:idModule', loadChildren: () => import('./components/statistics/statistics.module').then(mod => mod.StatisticsModule) },
  { path: '**', redirectTo: 'principal' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }