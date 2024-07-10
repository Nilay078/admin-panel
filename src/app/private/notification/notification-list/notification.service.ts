import { Injectable } from '@angular/core';
import { HttpService } from '../../../service/http.service';
import { Pagination } from '../../../common/common-entities/entity';
import { CommonListResponse, CommonResponse } from '../../../common/response/response';
import { ApiUrl } from '../../../constant/api-url';
import { Notification } from './notification';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor(private httpService: HttpService) {}

    notifiactionList(pagination: Pagination): Promise<CommonListResponse<Notification>> {
        const params = `start=${pagination.pageIndex * pagination.pageSize}&recordSize=${pagination.pageSize}`;
        return this.httpService.postAuth<CommonListResponse<Notification>>(`${ApiUrl.NOTIFICATION_LIST}?${params}`, {});
    }

    enableDisableNotification(id: string): Promise<CommonResponse> {
        return this.httpService.putAuth<CommonResponse>(`${ApiUrl.ENABLE_DISABLE_NOTIFICATION}?id=${id}`, {});
    }
}
