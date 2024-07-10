import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppUrlConstant } from '../constant/app-url';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: AppUrlConstant.DASHBOARD, pathMatch: 'full' },
    {
        path: AppUrlConstant.DASHBOARD,
        canActivate: [AuthGuard],
        component: DashboardComponent,
        data: { title: 'Dashboard | Alumnly Admin' },
    },
    {
        path: AppUrlConstant.NOTIFICATION,
        loadChildren: () => import('../private/notification/notification.module').then(m => m.NotificationModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PrivateRouting {}
