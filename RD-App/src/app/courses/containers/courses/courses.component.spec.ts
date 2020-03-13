import { Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CoursesApiService } from './../../../core/services/courses.api-service';
import { LoadingService } from './../../../core/services/loading.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesComponent
      ],
      providers: [
        LoadingService,
        CoursesApiService,
        HttpClient,
        HttpHandler,
        Router
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
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
});
