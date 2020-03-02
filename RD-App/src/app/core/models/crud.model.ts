import { Observable } from 'rxjs';
import { Course } from './course.model';

export interface CRUD {
    getCourses():  Observable<Course[]>,
    deleteCourse(id: number): Observable<{}>
}