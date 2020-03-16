import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CoursesApiService } from './courses.api-service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';

fdescribe('CoursesApiService', () => {
  let apiService: CoursesApiService;
  let httpTestingController: HttpTestingController;
  let mockCourses = [{
    title: "Title1",
    descr: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi inventore veniam blanditiis beatae dolor, repellat harum soluta consequuntur cum architecto temporibus est illo voluptatum? Odit!",
    id: 1,
    duration: 100,
    date: "10/03/20",
    authors: "Author2"
  }];

  let mockCourse = {
    title: "Title1",
    descr: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi inventore veniam blanditiis beatae dolor, repellat harum soluta consequuntur cum architecto temporibus est illo voluptatum? Odit!",
    id: 1,
    duration: 100,
    date: "10/03/20",
    authors: "Author2"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesApiService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    apiService = TestBed.inject(CoursesApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('service should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should get all courses', fakeAsync(() => {
    let param = new HttpParams();
    apiService.getCourses(param).subscribe(courses => {
      expect(courses).toEqual(mockCourses);
    });
    httpTestingController.expectOne({
      method: 'get',
      url: 'http://localhost:3000/courses'
    }).flush(mockCourses);
  }));

  it('should delete course by id', fakeAsync(() => {
    apiService.deleteCourseById(1).subscribe( res=> {
      expect(res).toEqual({});
    });
    httpTestingController.expectOne({
      method: 'delete',
      url: 'http://localhost:3000/courses/1'
    }).flush({});
  }));

  it('should add course', fakeAsync(() => {
    apiService.addCourse(mockCourse).subscribe( course => {
      expect(course).toEqual(mockCourse)
    });
    httpTestingController.expectOne({
      method: 'post',
      url: 'http://localhost:3000/courses/'
    }).flush(mockCourse);
  }));

  it('should edit course by id', fakeAsync(() => {
    apiService.editCourse(mockCourse).subscribe( res=> {
      expect(res).toEqual(mockCourse);
    });
    httpTestingController.expectOne({
      method: 'put',
      url: 'http://localhost:3000/courses/1'
    }).flush(mockCourse);
  }));

  it('should get course by id', fakeAsync(() => {
    apiService.getCourseById(1).subscribe( res=> {
      expect(res).toEqual(mockCourse);
    });
    httpTestingController.expectOne({
      method: 'get',
      url: 'http://localhost:3000/courses/1'
    }).flush(mockCourse);
  }));


  it('should get course by title', fakeAsync(() => {
    let title = 'title1';
    apiService.getCoursesByTitle(title).subscribe( res=> {
      expect(res).toEqual(mockCourses);
    });
    httpTestingController.expectOne({
      method: 'get',
      url: `http://localhost:3000/courses?title_like=${title}`
    }).flush(mockCourses);
  }));
});
