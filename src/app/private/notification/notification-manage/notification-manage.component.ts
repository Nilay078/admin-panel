import { Component } from '@angular/core';
import { ActiveMenuService } from '../../../shared/services/active-menu.service';
import { KeyValue, Key_Value_String } from '../../../common/common-entities/entity';
import { PageTitle } from '../../../constant/page-title';
import { NavigationUrl } from '../../../constant/navigation-url';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationManageService } from './notification-manage.service';
import { EditNotification, tinyMceToolBar } from './notification-manage';
import { Line100PercentBy700Theme } from '../../../constant/skeleton-theme';
import { range } from 'lodash';
import { NotificationTypeEnum } from '../notification-enum';
import { SnackBarService } from '../../../shared/services/snackbar.service';

@Component({
    selector: 'app-notification-manage',
    templateUrl: './notification-manage.component.html',
    styleUrl: './notification-manage.component.scss',
    providers: [NotificationManageService],
})
export class NotificationManageComponent {
    breadcrumbs: Key_Value_String[];
    notificationForm!: FormGroup;
    notificationId!: string;
    notificationInfo!: EditNotification;
    navigationUrl = NavigationUrl;
    notificationTypeEnum = NotificationTypeEnum;
    hasData!: boolean;
    notificationToolBar = tinyMceToolBar();
    theme = Line100PercentBy700Theme;
    placeholderList = range(0, 0);
    typeList: string[] = [NotificationTypeEnum.weekly, NotificationTypeEnum.daily, NotificationTypeEnum.instant];
    dayList!: KeyValue[];
    clicked!: boolean;

    constructor(
        private activeMenuService: ActiveMenuService,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private notificationManageService: NotificationManageService,
        private snackbarService: SnackBarService,
        private router: Router
    ) {
        this.activeMenuService.changeActiveMenu(true);
        this.breadcrumbs = [
            { key: PageTitle.NOTIFICATION, value: NavigationUrl.NOTIFICATION },
            { key: PageTitle.MANAGE, value: '' },
        ];
        this.notificationId = this.activatedRoute.snapshot.params['id'];
        if (this.notificationId) {
            this.getDayDropdown();
            this.editNotification(this.notificationId);
        }
    }

    createNotificationForm() {
        this.notificationForm = this.fb.group({
            name: new FormControl(this.notificationInfo.name),
            subject: new FormControl(this.notificationInfo.emailContentView.subject, [Validators.required, Validators.maxLength(1000)]),
            content: new FormControl(this.notificationInfo.emailContentView.content, Validators.required),
            type: new FormControl(),
            day: new FormControl(),
            scheduleTime: new FormControl(''),
            description: new FormControl('', [Validators.maxLength(255)]),
        });
    }

    editNotification(id: string) {
        this.hasData = false;
        this.notificationManageService
            .getNotificationDetails(id)
            .then(response => {
                this.notificationInfo = response.view;
                this.createNotificationForm();
                this.scheduleTimeValidations();
            })
            .finally(() => {
                this.hasData = true;
            });
    }

    getDayDropdown() {
        this.notificationManageService.dayDropdown().then(response => {
            this.dayList = response.list;
        });
    }

    onEmailContentChange(updatedContent: string) {
        this.notificationForm.patchValue({ content: updatedContent });
        console.log(updatedContent);
    }

    scheduleTimeValidations() {
        if (this.notificationInfo.type == NotificationTypeEnum.weekly) {
            this.notificationForm.controls['day'].addValidators(Validators.required);
            this.notificationForm.controls['scheduleTime'].addValidators(Validators.required);
            this.notificationForm.controls['day'].updateValueAndValidity();
            this.notificationForm.controls['scheduleTime'].updateValueAndValidity();
        }
    }

    onSubmit() {
        console.log(this.notificationForm.value);
        if (this.notificationForm.invalid) {
            return;
        }
        this.clicked = true;
        this.notificationManageService
            .updateNotification(this.notificationInfo)
            .then(response => {
                console.log(response);
                this.snackbarService.successSnackBar('Notification Updated Successfully');
                this.router.navigate([NavigationUrl.NOTIFICATION]);
            })
            .finally(() => {
                this.clicked = false;
            });
    }
}
