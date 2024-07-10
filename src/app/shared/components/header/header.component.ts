import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AppUrlConstant } from '../../../constant/app-url';
import { ChangePasswordComponent } from '../../../private/change-password/change-password.component';
import { PublicService } from '../../../public/public.service';
import { SnackBarService } from '../../services/snackbar.service';
import { NavigationUrl } from '../../../constant/navigation-url';
import CommonUtility from '../../../common/utilites/utils';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    @Input() showResponsive!: boolean;
    @Input() isExpanded!: boolean;
    @Output() responsiveFlag = new EventEmitter();
    @Output() expandedFlag = new EventEmitter();
    isOpen = false;

    constructor(
        private breakpointObserver: BreakpointObserver,
        public modalService: NgbModal,
        private router: Router,
        private snackbarService: SnackBarService,
        private publicService: PublicService
    ) {}

    sideNav() {
        this.breakpointObserver.observe(['(min-width: 0) and (max-width: 767px)']).subscribe((result: BreakpointState) => {
            if (result.matches) {
                this.showResponsive = true;
            }
        });
        this.breakpointObserver.observe(['(min-width: 768px) and (max-width: 991px)']).subscribe((result: BreakpointState) => {
            if (result.matches && !this.isExpanded) {
                this.showResponsive = true;
            }
            if (result.matches && this.isExpanded) {
                this.showResponsive = false;
            }
        });
        this.breakpointObserver.observe(['(min-width: 992px)']).subscribe((result: BreakpointState) => {
            if (result.matches && !this.isExpanded) {
                this.showResponsive = true;
            }
            if (result.matches && this.isExpanded) {
                this.showResponsive = false;
            }
        });
        this.isExpanded = !this.isExpanded;
        this.responsiveFlag.emit(this.showResponsive);
        this.expandedFlag.emit(this.isExpanded);
    }

    onLogout() {
        this.publicService.logout().then(response => {
            if (response.code >= 1000 && response.code < 2000) {
                this.snackbarService.successSnackBar(response.message);
                this.router.navigate([NavigationUrl.LOGIN]);
                CommonUtility.removeStorage();
            }
        });
    }

    gotoDashboard() {
        this.router.navigate([AppUrlConstant.DASHBOARD]);
    }

    changePassword() {
        this.modalService.open(ChangePasswordComponent, { backdrop: 'static', size: 'md', centered: true });
    }
}
