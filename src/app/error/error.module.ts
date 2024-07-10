import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { RouterModule } from '@angular/router';
import { AppUrlConstant } from '../constant/app-url';
import { ErrorMessage } from '../constant/error-message';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
    declarations: [ErrorComponent],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild([
            {
                path: '',
                component: ErrorComponent,
                data: {
                    errorCode: 0,
                    errorTitle: 'Error',
                    errorMessage: 'Error',
                },
            },
            {
                path: AppUrlConstant.INTERNAL_SERVER_ERROR,
                component: ErrorComponent,
                data: {
                    errorCode: 500,
                    errorTitle: ErrorMessage[500].shortDescription,
                    errorMessage: ErrorMessage[500].longDescription,
                },
            },
            {
                path: AppUrlConstant.PAGE_NOT_FOUND,
                component: ErrorComponent,
                data: {
                    errorCode: 404,
                    errorTitle: ErrorMessage[404].shortDescription,
                    errorMessage: ErrorMessage[404].longDescription,
                },
            },
            {
                path: AppUrlConstant.UNAUTHORIZED,
                component: ErrorComponent,
                data: {
                    errorCode: 401,
                    errorTitle: ErrorMessage[401].shortDescription,
                    errorMessage: ErrorMessage[401].longDescription,
                },
            },
            {
                path: AppUrlConstant.SERVICE_UNAVAILABLE,
                component: ErrorComponent,
                data: {
                    errorCode: 503,
                    errorTitle: ErrorMessage[503].shortDescription,
                    errorMessage: ErrorMessage[503].longDescription,
                },
            },
            {
                path: AppUrlConstant.FORBIDDEN,
                component: ErrorComponent,
                data: {
                    errorCode: 403,
                    errorTitle: ErrorMessage[403].shortDescription,
                    errorMessage: ErrorMessage[403].longDescription,
                },
            },
            {
                path: AppUrlConstant.BAD_GATEWAY,
                component: ErrorComponent,
                data: {
                    errorCode: 502,
                    errorTitle: ErrorMessage[502].shortDescription,
                    errorMessage: ErrorMessage[502].longDescription,
                },
            },
            {
                path: AppUrlConstant.BAD_REQUEST,
                component: ErrorComponent,
                data: {
                    errorCode: 400,
                    errorTitle: ErrorMessage[400].shortDescription,
                    errorMessage: ErrorMessage[400].longDescription,
                },
            },
        ]),
    ],
})
export class ErrorModule {}
