import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { PublicRouting } from './public-routing';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../service/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { SharedModule } from '../shared/shared.module';
import { PublicService } from './public.service';
import { AuthGuard } from '../auth/auth.guard';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { CommonService } from '../service/common.service';

const COMPONENTS = [LoginComponent, ForgotPasswordComponent, ResetPasswordComponent, SetPasswordComponent, OtpVerificationComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        CommonModule,
        PublicRouting,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgOtpInputModule,
        SharedModule,
    ],
    exports: [...COMPONENTS],
    providers: [HttpService, CommonService, PublicService, AuthGuard, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
})
export class PublicModule {}
