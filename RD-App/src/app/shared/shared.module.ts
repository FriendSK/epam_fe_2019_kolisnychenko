import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CourseItemComponent } from "../shared/course-item/course-item.component";
import { DelButtonComponent } from '../shared/del-button/del-button.component';
import { EditButtonComponent } from '../shared/edit-button/edit-button.component';
import { MaterialModule } from './../app/components/material/material.module';

@NgModule({
    declarations: [
        CourseItemComponent,
        DelButtonComponent,
        EditButtonComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        CourseItemComponent,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule { }
