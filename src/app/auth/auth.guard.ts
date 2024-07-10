import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Data, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SnackBarService } from '../shared/services/snackbar.service';
import { AppUrlConstant } from '../constant/app-url';
import { HttpService } from '../service/http.service';
import { CommonResponse, CommonViewResponse } from '../common/response/response';
import { Login } from '../public/login/login';
import { ApiUrl } from '../constant/api-url';

export interface Payload {
    registrationToken: boolean;
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        public jwtHelper: JwtHelperService,
        private router: Router,
        private snackbarService: SnackBarService,
        private httpService: HttpService
    ) {}

    canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> {
        const url: string = _state.url;
        const routeData = _route.data;
        const authToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (authToken == null || refreshToken == null) {
            if (!this.isPublicUrl(url) || routeData?.['isAuthRequired']) {
                this.router.navigate([AppUrlConstant.PUBLIC + '/' + AppUrlConstant.LOGIN]);
            }
            return Promise.resolve(true);
        }

        const authExpired: boolean = this.jwtHelper.isTokenExpired(authToken);
        const refreshExpired: boolean = this.jwtHelper.isTokenExpired(refreshToken);

        if (authExpired && refreshExpired) {
            return this.redirectToLogin();
        }

        if (!authExpired && !refreshExpired) {
            const authPayload = this.getPayload(authToken);
            return this.validatePrivateUrl(url, routeData, authPayload);
        }

        if (refreshExpired && !authExpired) {
            return this.redirectToLogin();
        }

        const tokenPayload = { accessToken: localStorage.getItem('accessToken'), refreshToken: localStorage.getItem('refreshToken') };
        return this.httpService
            .postAuth<CommonViewResponse<Login>>(`${ApiUrl.GENERATE_ACCESS_TOKEN}`, tokenPayload)
            .then((response: CommonResponse) => {
                if (response.accessToken) {
                    localStorage.setItem('auth-token', response.accessToken);
                    if (this.isPublicUrl(url)) {
                        this.router.navigate([AppUrlConstant.DASHBOARD]);
                        return Promise.resolve(false);
                    }
                    return Promise.resolve(true);
                } else {
                    return this.redirectToLogin();
                }
            });
    }

    private isPublicUrl(url: string) {
        return url.includes(AppUrlConstant.PUBLIC);
    }

    private redirectToLogin(): Promise<boolean> {
        localStorage.clear();
        this.snackbarService.errorSnackBar('You session is expired. Please login again.');
        this.router.navigate([AppUrlConstant.PUBLIC + '/' + AppUrlConstant.LOGIN]);
        return Promise.resolve(true);
    }

    private validatePrivateUrl(url: string, routeData: Data, authPayload: Payload) {
        const userView = localStorage.getItem('currentUser');

        if (this.isPublicUrl(url) && !routeData?.['isAuthRequired']) {
            this.router.navigate([AppUrlConstant.DASHBOARD]);
            return Promise.resolve(true);
        } else if (this.isPublicUrl(url) && routeData?.['isAuthRequired']) {
            if (!authPayload.registrationToken) {
                this.router.navigate([AppUrlConstant.DASHBOARD]);
            }
            return Promise.resolve(true);
        } else if (userView == null) {
            return this.redirectToLogin();
        } else {
            return Promise.resolve(true);
        }
    }

    private getPayload(token: string) {
        const userData: string[] = token.split('.');
        return JSON.parse(JSON.parse(atob(userData[1])).REQUEST_PAYLOAD) as Payload;
    }
}
