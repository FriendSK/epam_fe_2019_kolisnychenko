import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from '../courses/components/buttons/add-button/add-button.component';
import { SearchComponent } from './components/search/search.component';
import { CoursesComponent } from './containers/courses/courses/courses.component';
import { CoursesRoutingModule } from '../courses/courses.routing-module';
import { MaterialModule } from './../app/components/material/material.module';
import { CourseComponent } from './containers/course/course/course.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
      CoursesComponent,
      AddButtonComponent,
      SearchComponent,
      CourseComponent,
      CourseFormComponent,
    ],
  imports: [
    CommonModule,
    MaterialModule,
    CoursesRoutingModule,
    SharedModule
  ],
})
export class CoursesModule { }
