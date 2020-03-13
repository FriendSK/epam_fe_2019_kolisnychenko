import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { LoadingService } from './../../../core/services/loading.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CoursesService } from '../../services/courses.service';

xdescribe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let spy: jasmine.Spy;
  let loadingService: LoadingService;
  let coursesService: CoursesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesComponent
      ],
      providers: [
        LoadingService,
        CoursesService,
        HttpClient,
        HttpHandler
      ],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    coursesService = fixture.debugElement.injector.get(CoursesService);
    loadingService = fixture.debugElement.injector.get(LoadingService);
    fixture.detectChanges();
  }));


  it('should create courses component', () => {
    expect(component).toBeTruthy();
  });

  it('should show loader on isLoading = true', () => {
    const loadingService = TestBed.inject(LoadingService);
    loadingService.loadingSubject.next(true);

    fixture.detectChanges();
    const loaderEl = fixture.debugElement.query(By.css('loader'));
    expect(loaderEl).toBeTruthy();
  });

  describe('refreshCourses()', () => {
    it('should call getCourses method', () => {
      let param = new HttpParams();
      component.refreshCourses(param);
      expect(component.refreshCourses).toHaveBeenCalled();
    });
  });
});
