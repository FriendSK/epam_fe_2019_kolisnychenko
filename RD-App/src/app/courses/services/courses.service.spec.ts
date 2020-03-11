import { CoursesApiService } from './../../core/services/courses.api-service';
import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { RouterTestingModule } from '@angular/router/testing';

const apiMethods = [
  'addCourse',
  'editCourse',
  'navigateById',
  'getCourses',
  'deleteCourseById',
  'getCourseById',
  'getCoursesByTitle'
]

fdescribe('CoursesService', () => {
  let service: CoursesService;
  let apiService: CoursesApiService;

  beforeEach(() => {
    apiService = jasmine.createSpyObj('CoursesApiService', apiMethods)
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        CoursesService,
        {
          provide: CoursesApiService,
          useValue: apiService
        }]
    });
    service = TestBed.inject(CoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
