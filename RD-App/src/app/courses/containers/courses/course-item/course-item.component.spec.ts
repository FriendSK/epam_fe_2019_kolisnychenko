import { DurationConvertPipe } from './../../../../shared/pipes/duration-convert.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseItemComponent } from './course-item.component';
import { By } from '@angular/platform-browser';

const courseMock = {
  title: 'Title1',
  descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi inventore veniam blanditiis beatae dolor, repellat harum soluta consequuntur cum architecto temporibus est illo voluptatum? Odit!',
  duration: 100,
  date: '10/03/20',
  id: '1'
}

  fdescribe('CourseItemComponent', () => {
    let component: CourseItemComponent;
    let fixture: ComponentFixture<CourseItemComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [CourseItemComponent, DurationConvertPipe]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CourseItemComponent);
      component = fixture.componentInstance;
      component.item = courseMock;
      fixture.detectChanges();
    });

    it('should create course-item component', () => {
      expect(component).toBeTruthy();
    });

    it('should have correct bindings', () => {
      const titleEl = fixture.debugElement.query(By.css('mat-card-title'));
      const descrEl = fixture.debugElement.query(By.css('mat-card-content'));
      const timeEl = fixture.debugElement.query(By.css('.course__time'));
      const dateEl = fixture.debugElement.query(By.css('.course__day'));

      expect(titleEl.nativeElement.textContent).toBe(courseMock.title);
      expect(descrEl.nativeElement.textContent).toBe(courseMock.descr);
      expect(timeEl.nativeElement.textContent).toBe('1h 40min');
      expect(dateEl.nativeElement.textContent).toBe(courseMock.date);
    });

    it('should emit on edit click', () => {
      let id;
      const editEl = fixture.debugElement.query(By.css('.course__edit-button'));

        component.edit.subscribe(elemId => id = elemId);

        editEl.triggerEventHandler('click', null);
        expect(id).toBe(courseMock.id);
    });

    it('should emit on delete click', () => {
      let id;
      const deleteEl = fixture.debugElement.query(By.css('.course__del-button'));

        component.delete.subscribe(elemId => id = elemId);

        deleteEl.triggerEventHandler('click', null);
        expect(id).toBe(courseMock.id);
    });

  });
