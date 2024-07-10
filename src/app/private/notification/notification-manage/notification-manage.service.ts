import { Injectable } from '@angular/core';
import { HttpService } from '../../../service/http.service';
import { ApiUrl } from '../../../constant/api-url';
import { CommonListResponse, CommonViewResponse } from '../../../common/response/response';
import { EditNotification } from './notification-manage';
import { KeyValue } from '../../../common/common-entities/entity';

@Injectable({
    providedIn: 'root',
})
export class NotificationManageService {
    constructor(private httpService: HttpService) {}

    getNotificationDetails(id: string): Promise<CommonViewResponse<EditNotification>> {
        return this.httpService.getAuth<CommonViewResponse<EditNotification>>(`${ApiUrl.EDIT_NOTIFICATION}?id=${id}`);
    }

    dayDropdown(): Promise<CommonListResponse<KeyValue>> {
        return this.httpService.get<CommonListResponse<KeyValue>>(`${ApiUrl.DAYS_DROPDOWN}`);
    }

    updateNotification(notification: EditNotification): Promise<CommonViewResponse<EditNotification>> {
        return this.httpService.putAuth<CommonViewResponse<EditNotification>>(`${ApiUrl.UPDATE_NOTIFICATION}`, notification);
    }
}
