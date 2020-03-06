import { Component, OnInit, Input, Output, ChangeDetectionStrategy } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-course-item",
  templateUrl: "./course-item.component.html",
  styleUrls: ["./course-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CourseItemComponent implements OnInit {

  @Input() item: any;
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() edit: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onHandleDelete(): void {
    this.delete.emit(this.item.id)
  }

  onHandleEdit(): void {
    this.edit.emit(this.item.id)
  }
}
