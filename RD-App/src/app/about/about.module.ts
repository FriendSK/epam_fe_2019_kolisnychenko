import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about/about.component';
import { AboutRoutingModule } from './about.routing-module';
import { MaterialModule } from './../app/components/material/material.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
