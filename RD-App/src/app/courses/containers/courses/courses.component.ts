import { Observable } from 'rxjs/internal/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../../core/models/course.model';
import { LoadingService } from '../../../core/services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [CoursesService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent  {


  private courseLimit: number = 3;
  private courseStart: number = 0;
  public courses$: Observable<Course[]> = this.coursesService.getCourses(this.courseStart, this.courseLimit);

  constructor(private coursesService: CoursesService,
              public loadingService: LoadingService,
              private router: Router) {
  }

  onHandleDelete(id: number): void {
    this.coursesService.deleteCourseById(id);
  }

  onHandleEdit(id: number): void {
    this.router.navigate([`courses/${id}`]);
  }

  onHandleLoadMore() {
    this.courseLimit ++;
    this.courses$ = this.coursesService.getCourses(this.courseStart, this.courseLimit)
  }
}
