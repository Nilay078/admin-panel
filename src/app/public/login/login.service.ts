import { Injectable } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { CommonViewResponse } from '../../common/response/response';
import { ApiUrl } from '../../constant/api-url';
import { Login } from './login';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(private httpService: HttpService) {}

    login(user: { loginId: string; password: string }): Promise<CommonViewResponse<Login>> {
        return this.httpService.post<CommonViewResponse<Login>>(`${ApiUrl.LOGIN_API}`, user);
    }
}
