import { Component, OnInit } from '@angular/core';
import { Key_Value_String, Pagination } from '../../../common/common-entities/entity';
import { PageTitle } from '../../../constant/page-title';
import { Router } from '@angular/router';
import { NavigationUrl } from '../../../constant/navigation-url';
import { Line100By50Theme } from '../../../constant/skeleton-theme';
import { range } from 'lodash';
import { PaginationTypeEnum } from '../../../enums/enums';
import { paginationFactory } from '../../../shared/entities/pagination';
import { NotificationService } from './notification.service';
import { Notification } from './notification';
import { NotificationTypeEnum } from '../notification-enum';
import { SnackBarService } from '../../../shared/services/snackbar.service';

@Component({
    selector: 'app-notification-list',
    templateUrl: './notification-list.component.html',
    providers: [NotificationService],
})
export class NotificationListComponent implements OnInit {
    breadcrumbs: Key_Value_String[];
    hasData = false;
    theme = Line100By50Theme;
    notificationEnum = NotificationTypeEnum;
    navigationUrl = NavigationUrl;
    placeholderList = range(0, 6);
    pagination!: Pagination;
    displayedColumns: string[] = ['sr_no', 'name', 'type', 'day_time', 'email', 'action'];
    notificationList: Notification[] = [];

    constructor(
        private router: Router,
        private notificationService: NotificationService,
        private snackbarService: SnackBarService
    ) {
        this.breadcrumbs = [{ key: PageTitle.NOTIFICATION, value: '' }];
        this.pagination = paginationFactory(PaginationTypeEnum.table);
    }

    ngOnInit(): void {
        this.notification();
    }

    notification() {
        this.hasData = false;
        this.notificationService
            .notifiactionList(this.pagination)
            .then(response => {
                this.notificationList = response.list;
                if (response.code === 2121) {
                    this.notificationList = [];
                }
                this.pagination.length = response.records;
            })
            .finally(() => {
                this.hasData = true;
            });
    }

    enableDisableNotification(notificaton: Notification) {
        this.notificationService.enableDisableNotification(notificaton.id).then(() => {
            if (notificaton.email) {
                this.snackbarService.successSnackBar('Notification is Successfully disabled');
            } else {
                this.snackbarService.successSnackBar('Notification is successfully enabled');
            }
            this.notification();
        });
    }
}
