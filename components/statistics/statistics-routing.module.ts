import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticsComponent } from './statistics.component';
import { LoginGuard } from 'src/app/guards/login.guard';

const routes: Routes = [
  { path: '', component: StatisticsComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StatisticsRoutingModule { }