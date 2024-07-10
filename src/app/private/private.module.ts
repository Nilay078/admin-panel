import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrivateRouting } from './private-routing';
import { SharedModule } from '../shared/shared.module';
import { HttpService } from '../service/http.service';
import { CommonService } from '../service/common.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../auth/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

const COMPONENTS = [DashboardComponent, ChangePasswordComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, PrivateRouting, SharedModule, HttpClientModule, FormsModule, ReactiveFormsModule, NgxSkeletonLoaderModule],
    exports: [...COMPONENTS],
    providers: [HttpService, CommonService, AuthGuard, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
})
export class PrivateModule {}
