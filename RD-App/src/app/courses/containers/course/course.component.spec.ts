import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CoursesService } from './../../services/courses.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseComponent } from './course.component';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

fdescribe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseComponent],
      providers: [
        CoursesService,
        HttpClient,
        HttpHandler,
      ],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create course component', () => {
    expect(component).toBeTruthy();
  });

  describe('onAdd()', () => {
    it('should call onAdd method', () => {
      spyOn(component, 'onAdd');
      const formEl = fixture.debugElement.query(By.css('app-course-form'));
      formEl.triggerEventHandler('add', null);
      expect(component.onAdd).toHaveBeenCalled();
    });
  });

  describe('onEdit()', () => {
    it('should call onEdit method', () => {
      spyOn(component, 'onEdit');
      const formEl = fixture.debugElement.query(By.css('app-course-form'));
      formEl.triggerEventHandler('edit', null);
      expect(component.onEdit).toHaveBeenCalled();
    });
  });
});
