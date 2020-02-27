import { Course } from '../../app/core/models/course.model';
import { CoursesApiService } from '../../core/services/courses.api-service';
import { CRUD } from 'src/app/app/core/models/crud.model';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';

@Injectable()

export class CoursesService implements CRUD {

    constructor(private coursesAPIService: CoursesApiService) {
    }

    getCourses(): Observable<Course[]> {
        return this.coursesAPIService.getCourses();
    }

    deleteCourse(id: number): Observable<{}> {
        return this.coursesAPIService.deleteCourse(id);
    }
}
