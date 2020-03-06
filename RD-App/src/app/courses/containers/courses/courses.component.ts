import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
export class CoursesComponent implements OnInit {

  public courses$: Observable<Course[]>;

  constructor(private coursesService: CoursesService,
              public loadingService: LoadingService,
              private router: Router) {

    this.courses$ = this.coursesService.getCourses();
  }

  ngOnInit(): void {
  }

  onHandleDelete(id: number) {
    this.coursesService.deleteCourseById(id);
  }

  onHandleEdit(id: number) {
    this.router.navigate([`courses/${id}`]);
  }
}
