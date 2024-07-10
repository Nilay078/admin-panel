import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatSnackbarComponent } from './components/mat-snackbar/mat-snackbar.component';
import { MaterialModule } from './material/material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LineSkeletonLoaderComponent } from './components/line-skeleton-loader/line-skeleton-loader.component';
import { CircleSkeletonLoaderComponent } from './components/circle-skeleton-loader/circle-skeleton-loader.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MatPaginationComponent } from './components/mat-pagination/mat-pagination.component';
import { NoRecordFoundComponent } from './components/no-record-found/no-record-found.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TinymceEditorComponent } from './components/tinymce-editor/tinymce-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
    HeaderComponent,
    SidebarComponent,
    MatSnackbarComponent,
    LoaderComponent,
    ErrorMessageComponent,
    LineSkeletonLoaderComponent,
    CircleSkeletonLoaderComponent,
    BreadcrumbComponent,
    MatPaginationComponent,
    NoRecordFoundComponent,
    TinymceEditorComponent,
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, RouterModule, MaterialModule, NgxSkeletonLoaderModule, EditorModule, FormsModule, ReactiveFormsModule],
    exports: [...COMPONENTS, MaterialModule],
})
export class SharedModule {}
