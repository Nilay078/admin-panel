import { Injectable } from '@angular/core';
import { HttpService } from '../service/http.service';
import { CommonResponse } from '../common/response/response';
import { ApiUrl } from '../constant/api-url';

@Injectable({
    providedIn: 'root',
})
export class PublicService {
    constructor(private httpService: HttpService) {}

    logout(): Promise<CommonResponse> {
        return this.httpService.getAuth<CommonResponse>(`${ApiUrl.LOGOUT_API}`);
    }
}
