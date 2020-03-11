import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CoursesService } from './../../services/courses.service';
import { tap, debounceTime, distinctUntilChanged, switchMap, catchError, map } from 'rxjs/operators';
import { Course } from '../../../../app/core/models/course.model';
import { EMPTY, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [CoursesService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {

  @Output() searchedCourses:  EventEmitter<Observable<Course[]>> = new EventEmitter();

  constructor(private coursesService: CoursesService) { }

  private subscription: Subscription;
  public searchControl: FormControl = new FormControl();

  ngOnInit(): void {

    this.subscription = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value: string) => this.coursesService.getCoursesByTitle(value).pipe(
        catchError(err => EMPTY))
      ),
      tap(res => { this.searchedCourses.emit(of(res)) })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
