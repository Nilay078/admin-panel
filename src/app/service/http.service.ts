import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import CommonUtility from '../common/utilites/utils';
import { CommonResponse } from '../common/response/response';
import { AppUrlConstant } from '../constant/app-url';
import { SnackBarService } from '../shared/services/snackbar.service';
import { NavigationUrl } from '../constant/navigation-url';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor(
        private router: Router,
        private http: HttpClient,
        private snackbarService: SnackBarService
    ) {}

    get<T extends CommonResponse>(path: string, handleErrInSpecComponent = false): Promise<T> {
        return lastValueFrom(this.http.get(path))
            .then((response: object) => {
                const proResponse = response as T;
                if ((proResponse.code < 1000 || proResponse.code == 2093 || proResponse.code == 2094) && !handleErrInSpecComponent) {
                    this.recreateAccessToken(proResponse);
                    if (!this.recreateAccessToken(proResponse)) {
                        this.snackbarService.errorSnackBar(proResponse.message);
                        return Promise.reject(new Error(proResponse.message));
                    }
                }
                this.setOrUpdateToken(proResponse);
                return Promise.resolve(proResponse);
            })
            .catch((httpErrorResponse: HttpErrorResponse) => {
                this.handleHttpErrorResponse(httpErrorResponse);
                return Promise.reject({} as T);
            });
    }

    post<T extends CommonResponse>(path: string, data: object, handleErrInSpecComponent = false): Promise<T> {
        return lastValueFrom(this.http.post(path, data))
            .then((response: object) => {
                const proResponse = response as T;
                if (proResponse.code < 1000 || proResponse.code == 2093 || (proResponse.code == 2094 && !handleErrInSpecComponent)) {
                    this.recreateAccessToken(proResponse);
                    if (!this.recreateAccessToken(proResponse)) {
                        this.snackbarService.errorSnackBar(proResponse.message);
                        return Promise.reject(new Error(proResponse.message));
                    }
                }
                this.setOrUpdateToken(proResponse);
                return Promise.resolve(proResponse);
            })
            .catch((httpErrorResponse: HttpErrorResponse) => {
                this.handleHttpErrorResponse(httpErrorResponse);
                return Promise.reject({} as T);
            });
    }

    put<T extends CommonResponse>(path: string, data: object, handleErrInSpecComponent = false): Promise<T> {
        return lastValueFrom(this.http.put(path, data))
            .then((response: object) => {
                const proResponse = response as T;
                if (proResponse.code < 1000 || proResponse.code == 2093 || (proResponse.code == 2094 && !handleErrInSpecComponent)) {
                    this.recreateAccessToken(proResponse);
                    if (!this.recreateAccessToken(proResponse)) {
                        this.snackbarService.errorSnackBar(proResponse.message);
                        return Promise.reject(new Error(proResponse.message));
                    }
                }
                this.setOrUpdateToken(proResponse);
                return Promise.resolve(proResponse);
            })
            .catch((httpErrorResponse: HttpErrorResponse) => {
                this.handleHttpErrorResponse(httpErrorResponse);
                return Promise.reject({} as T);
            });
    }

    getAuth<T extends CommonResponse>(path: string, handleErrInSpecComponent = false): Promise<T> {
        return lastValueFrom(this.http.get(path, { headers: this.getHeader() }))
            .then((response: object) => {
                const proResponse = response as T;
                if (proResponse.code < 1000 || proResponse.code == 2093 || (proResponse.code == 2094 && !handleErrInSpecComponent)) {
                    this.recreateAccessToken(proResponse);
                    if (!this.recreateAccessToken(proResponse)) {
                        this.snackbarService.errorSnackBar(proResponse.message);
                        return Promise.reject(new Error(proResponse.message));
                    }
                }
                this.setOrUpdateToken(proResponse);
                return Promise.resolve(proResponse);
            })
            .catch((httpErrorResponse: HttpErrorResponse) => {
                this.handleHttpErrorResponse(httpErrorResponse);
                return Promise.reject({} as T);
            });
    }

    deleteAuth<T extends CommonResponse>(path: string, handleErrInSpecComponent = false): Promise<T> {
        return lastValueFrom(this.http.delete(path, { headers: this.getHeader() }))
            .then((response: object) => {
                const proResponse = response as T;
                if (proResponse.code < 1000 || proResponse.code == 2093 || (proResponse.code == 2094 && !handleErrInSpecComponent)) {
                    this.recreateAccessToken(proResponse);
                    if (!this.recreateAccessToken(proResponse)) {
                        this.snackbarService.errorSnackBar(proResponse.message);
                        return Promise.reject(new Error(proResponse.message));
                    }
                }
                this.setOrUpdateToken(proResponse);
                return Promise.resolve(proResponse);
            })
            .catch((httpErrorResponse: HttpErrorResponse) => {
                this.handleHttpErrorResponse(httpErrorResponse);
                return Promise.reject({} as T);
            });
    }

    postAuth<T extends CommonResponse>(path: string, data: object, handleErrInSpecComponent = false): Promise<T> {
        return lastValueFrom(this.http.post(path, data, { headers: this.getHeader() }))
            .then((response: object) => {
                const proResponse = response as T;
                if (proResponse.code < 1000 || proResponse.code == 2093 || (proResponse.code == 2094 && !handleErrInSpecComponent)) {
                    this.recreateAccessToken(proResponse);
                    if (!this.recreateAccessToken(proResponse)) {
                        this.snackbarService.errorSnackBar(proResponse.message);
                        return Promise.reject(new Error(proResponse.message));
                    }
                }
                this.setOrUpdateToken(proResponse);
                return Promise.resolve(proResponse);
            })
            .catch((httpErrorResponse: HttpErrorResponse) => {
                this.handleHttpErrorResponse(httpErrorResponse);
                return Promise.reject({} as T);
            });
    }

    putAuth<T extends CommonResponse>(path: string, data: object = {}, handleErrInSpecComponent = false): Promise<T> {
        return lastValueFrom(this.http.put(path, data, { headers: this.getHeader() }))
            .then((response: object) => {
                const proResponse = response as T;
                if (proResponse.code < 1000 || proResponse.code == 2093 || (proResponse.code == 2094 && !handleErrInSpecComponent)) {
                    this.recreateAccessToken(proResponse);
                    if (!this.recreateAccessToken(proResponse)) {
                        this.snackbarService.errorSnackBar(proResponse.message);
                        return Promise.reject(new Error(proResponse.message));
                    }
                }
                this.setOrUpdateToken(proResponse);
                return Promise.resolve(proResponse);
            })
            .catch((httpErrorResponse: HttpErrorResponse) => {
                this.handleHttpErrorResponse(httpErrorResponse);
                return Promise.reject({} as T);
            });
    }

    recreateAccessToken(response: CommonResponse) {
        if (response.code < 2000) {
            return false;
        } else {
            if (response.code === 2000) {
                this.router.navigate([AppUrlConstant.ERROR + '/' + AppUrlConstant.INTERNAL_SERVER_ERROR]);
            } else if (response.code === 2093) {
                this.snackbarService.errorSnackBar(response.message);
                this.router.navigate([NavigationUrl.LOGIN]);
                CommonUtility.removeStorage();
            } else if (response.code === 2094) {
                this.router.navigate([NavigationUrl.LOGIN]);
                this.snackbarService.errorSnackBar('Token is Expired, Please Login again');
            }
            return true;
        }
    }

    private handleHttpErrorResponse(httpErrorResponse: HttpErrorResponse): void {
        if (!httpErrorResponse.error) {
            return;
        }
        switch (httpErrorResponse.status) {
            case 500:
                this.router.navigateByUrl(AppUrlConstant.INTERNAL_SERVER_ERROR);
                break;
            case 404:
                this.router.navigateByUrl(AppUrlConstant.PAGE_NOT_FOUND);
                break;
            case 401:
                this.router.navigateByUrl(AppUrlConstant.UNAUTHORIZED);
                break;
            case 403:
                this.router.navigateByUrl(AppUrlConstant.FORBIDDEN);
                break;
            case 502:
                this.router.navigateByUrl(AppUrlConstant.BAD_GATEWAY);
                break;
            case 503:
                this.router.navigateByUrl(AppUrlConstant.SERVICE_UNAVAILABLE);
                break;
            case 400:
                this.router.navigateByUrl(AppUrlConstant.BAD_REQUEST);
                break;
            case 0:
                this.router.navigateByUrl(AppUrlConstant.ERROR);
                break;
            default:
                this.snackbarService.errorSnackBar(httpErrorResponse.message);
                break;
        }
    }

    private setOrUpdateToken(response: CommonResponse): void {
        if (response.accessToken) {
            CommonUtility.setAccessToken(response.accessToken);
        }
        if (response.refreshToken) {
            CommonUtility.setRefreshToken(response.refreshToken);
        }
    }

    private getHeader() {
        return new HttpHeaders({
            Authorization: 'bearer ' + CommonUtility.getAccessToken(),
        });
    }
}
