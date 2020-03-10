import { Component, Input, Output, ChangeDetectionStrategy } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-course-item",
  templateUrl: "./course-item.component.html",
  styleUrls: ["./course-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CourseItemComponent {

  @Input() item: any;
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() edit: EventEmitter<number> = new EventEmitter();

  constructor() { }

  onHandleDelete(): void {
    this.delete.emit(this.item.id)
  }

  onHandleEdit(): void {
    this.edit.emit(this.item.id)
  }
}
