import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from '../courses/components/buttons/add-button/add-button.component';
import { DelButtonComponent } from './components/buttons/del-button/del-button.component';
import { EditButtonComponent } from './components/buttons/edit-button/edit-button.component';
import { SearchComponent } from './components/search/search.component';
import { CoursesComponent } from './containers/courses/courses/courses.component';
import { CoursesRoutingModule } from '../courses/courses.routing-module';
import { MaterialModule } from './../app/components/material/material.module';
import { CourseComponent } from './containers/course/course/course.component';

@NgModule({
  declarations: [
      CoursesComponent,
      AddButtonComponent,
      DelButtonComponent,
      EditButtonComponent,
      SearchComponent,
      CourseComponent
    ],
  imports: [
    CommonModule,
    MaterialModule,
    CoursesRoutingModule
  ]
})
export class CoursesModule { }
