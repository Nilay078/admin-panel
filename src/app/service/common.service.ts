import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { CommonAuthEnum } from '../enums/enums';
import CommonUtility from '../common/utilites/utils';
import { CommonViewResponse } from '../common/response/response';
import { Login } from '../public/login/login';
import { ApiUrl } from '../constant/api-url';
import { SnackBarService } from '../shared/services/snackbar.service';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    constructor(
        private httpService: HttpService,
        private snackbarService: SnackBarService
    ) {}

    doGenerateAccessToken() {
        return new Promise<void>((resolve, reject) => {
            const payload: { accessToken: string; refreshToken: string } = {
                [CommonAuthEnum.accessToken]: CommonUtility.getAccessToken(),
                [CommonAuthEnum.refreshToken]: CommonUtility.getRefreshToken(),
            };
            this.generateAccessToken(payload).then(tokenResponse => {
                if (tokenResponse.code >= 1000 && tokenResponse.code < 2000) {
                    if (tokenResponse.accessToken) {
                        CommonUtility.setAccessToken(tokenResponse.accessToken);
                    }
                    if (tokenResponse.refreshToken) {
                        CommonUtility.setRefreshToken(tokenResponse.refreshToken);
                    }
                    window.location.reload();
                    resolve();
                } else {
                    reject();
                }
            });
        });
    }

    generateAccessToken(tokenPayload: { accessToken: string; refreshToken: string }): Promise<CommonViewResponse<Login>> {
        return this.httpService.postAuth<CommonViewResponse<Login>>(`${ApiUrl.GENERATE_ACCESS_TOKEN}`, tokenPayload);
    }

    isLogin(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.doIsLogin()
                .then(response => {
                    if (response.code >= 1000 && response.code < 2000) {
                        CommonUtility.setUserView(response.view);
                        if (response.accessToken) {
                            CommonUtility.setAccessToken(response.accessToken);
                        }
                        if (response.refreshToken) {
                            CommonUtility.setRefreshToken(response.refreshToken);
                        }
                    }
                    resolve(true);
                })
                .catch(error => {
                    this.snackbarService.errorSnackBar(error);
                    reject(false);
                });
        });
    }

    doIsLogin(): Promise<CommonViewResponse<Login>> {
        return this.httpService.getAuth<CommonViewResponse<Login>>(`${ApiUrl.IS_USER_LOGGEDIN}`);
    }
}
