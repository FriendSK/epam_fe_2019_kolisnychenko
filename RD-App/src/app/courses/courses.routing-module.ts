import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from '../courses/containers/courses/courses/courses.component';
import { CourseComponent } from '../courses/containers/course/course/course.component';

const routes: Routes = [
    {
        path: '',
        component: CoursesComponent
    },
    {
        path: 'add',
        component: CourseComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoursesRoutingModule { }