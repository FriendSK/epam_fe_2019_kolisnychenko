import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CourseItemComponent } from "../shared/course-item/course-item.component";
import { DelButtonComponent } from '../shared/del-button/del-button.component';
import { EditButtonComponent } from '../shared/edit-button/edit-button.component';
import { MaterialModule } from './../shared/material/material.module';
import { DurationConvertPipe } from './pipes/duration-convert.pipe';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    declarations: [
        CourseItemComponent,
        DelButtonComponent,
        EditButtonComponent,
        DurationConvertPipe,
        LoaderComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        CourseItemComponent,
        LoaderComponent
    ]
})
export class SharedModule { }
