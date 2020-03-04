import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from './../shared/material/material.module';
import { DurationConvertPipe } from './pipes/duration-convert.pipe';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    declarations: [
        DurationConvertPipe,
        LoaderComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        LoaderComponent,
        DurationConvertPipe
    ]
})
export class SharedModule { }
