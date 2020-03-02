import { Component, OnInit, Input, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-course-item",
  templateUrl: "./course-item.component.html",
  styleUrls: ["./course-item.component.scss"]
})
export class CourseItemComponent implements OnInit {

  @Input() item: any;
  @Output() deleted: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }

  onHandleDelete(): void {
    this.deleted.emit(this.item.id)
  }
}
