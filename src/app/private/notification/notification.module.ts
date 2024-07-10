import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationRouting } from './notification-routing';
import { SharedModule } from '../../shared/shared.module';
import { NotificationManageComponent } from './notification-manage/notification-manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

const COMPONENTS = [NotificationListComponent, NotificationManageComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, NotificationRouting, SharedModule, FormsModule, ReactiveFormsModule, NgxMaterialTimepickerModule],
    exports: [...COMPONENTS],
})
export class NotificationModule {}
