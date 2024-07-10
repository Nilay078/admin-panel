import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppUrlConstant } from '../constant/app-url';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: AppUrlConstant.LOGIN,
        component: LoginComponent,
        canActivate: [AuthGuard],
        data: { title: 'Login | Alumnly Admin' },
    },
    {
        path: AppUrlConstant.FORGOT_PASSWORD,
        component: ForgotPasswordComponent,
        canActivate: [AuthGuard],
        data: { title: 'Forgot Password | Alumnly Admin' },
    },
    {
        path: AppUrlConstant.RESET_PASSWORD_VERIFICATION,
        component: ResetPasswordComponent,
        canActivate: [AuthGuard],
        data: { title: 'Reset Password | Alumnly Admin', isAuthRequired: true },
    },
    {
        path: AppUrlConstant.SET_PASSWORD,
        component: SetPasswordComponent,
        canActivate: [AuthGuard],
        data: { title: 'Set Password | Alumnly Admin', isAuthRequired: true },
    },
    {
        path: AppUrlConstant.OTP_VERIFICATION,
        component: OtpVerificationComponent,
        canActivate: [AuthGuard],
        data: { title: 'OTP Verification | Alumnly Admin', isAuthRequired: true },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PublicRouting {}
