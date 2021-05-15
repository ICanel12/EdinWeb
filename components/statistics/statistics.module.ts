import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsComponent } from './statistics.component';
import { StatisticsRoutingModule } from './statistics-routing.module';

//LIBRARIES
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    NgxChartsModule
  ]
})

export class StatisticsModule { }