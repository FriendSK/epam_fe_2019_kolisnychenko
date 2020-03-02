import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from '../courses/components/buttons/add-button/add-button.component';
import { SearchComponent } from './components/search/search.component';
import { CoursesComponent } from './containers/courses/courses.component';
import { CoursesRoutingModule } from '../courses/courses.routing-module';
import { MaterialModule } from './../shared/material/material.module';
import { CourseComponent } from './containers/course/course.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { SharedModule } from './../shared/shared.module';
import { HighlightDirective } from './directives/highlight.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseItemComponent } from './../courses/containers/courses/course-item/course-item.component';

@NgModule({
    declarations: [
        CoursesComponent,
        AddButtonComponent,
        SearchComponent,
        CourseComponent,
        CourseFormComponent,
        HighlightDirective,
        CourseItemComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        CoursesRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class CoursesModule { }
