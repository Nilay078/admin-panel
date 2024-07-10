import { RouterModule, Routes } from '@angular/router';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NgModule } from '@angular/core';
import { NotificationManageComponent } from './notification-manage/notification-manage.component';
import { AppUrlConstant } from '../../constant/app-url';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
    { path: '', component: NotificationListComponent, canActivate: [AuthGuard], data: { title: 'Notification | Alumnly Admin' } },
    {
        path: AppUrlConstant.EDIT_OPERATION + ':id',
        component: NotificationManageComponent,
        canActivate: [AuthGuard],
        data: { title: 'Notification | Alumnly Admin' },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NotificationRouting {}
