import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ActiveMenuService } from '../../services/active-menu.service';
import { Menu } from '../../entities/Menu';
import { SideBarMenuList } from '../../enums/side-menu';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
    @ViewChild('sidenav') sidenav?: MatSidenav;
    @Output() isExpandedFlag = new EventEmitter();
    @Output() showResponsiveFlag = new EventEmitter();

    isExpanded = true;
    showSubmenu = false;
    showResponsive = false;
    showSubSubMenu = false;
    currentUrl!: string;

    menuList: Menu[] = [];

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router,
        private activeMenuService: ActiveMenuService
    ) {}

    ngOnInit(): void {
        this.breakpointObserver.observe(['(min-width: 0px) and (max-width: 767px)']).subscribe((result: BreakpointState) => {
            if (result.matches) {
                this.isExpanded = true;
            }
        });
        this.breakpointObserver.observe(['(min-width: 768px) and (max-width: 991px)']).subscribe((result: BreakpointState) => {
            if (result.matches) {
                this.isExpanded = false;
            }
        });
        this.breakpointObserver.observe(['(min-width: 992px)']).subscribe((result: BreakpointState) => {
            if (result.matches) {
                this.isExpanded = true;
                this.showResponsive = true;
            }
        });
        this.menuList = SideBarMenuList as Menu[];
        this.activeMenuService.activeMenu.subscribe(() => {
            const routerList = this.router.url.split('/');
            if (routerList.length > 2) {
                this.activeParentMenu(routerList[1], routerList[1] + '/' + routerList[2]);
            } else {
                this.activeParentMenu(this.router.url.split('/')[1]);
            }
        });
    }

    activeParentMenu(activeMenu: string, submenu?: string) {
        this.menuList.forEach((menuData: Menu) => {
            if (menuData.routerLink === activeMenu) {
                menuData.active = true;
            } else {
                menuData.active = false;
            }
            if (menuData.children) {
                menuData.children.forEach((element: Menu) => {
                    if (element.routerLink === submenu) {
                        element.active = true;
                    } else {
                        element.active = false;
                    }
                });
            }
        });
    }

    openMenu(menu: Menu, submenu?: Menu) {
        this.activeParentMenu(menu.routerLink, submenu?.routerLink);
        this.breakpointObserver.observe(['(min-width: 0) and (max-width: 767px)']).subscribe((result: BreakpointState) => {
            if (result.matches) {
                this.isExpanded = true;
            }
        });
    }

    mouseenter() {
        this.breakpointObserver.observe(['(min-width: 0) and (max-width: 767px)']).subscribe((result: BreakpointState) => {
            if (result.matches) {
                this.isExpanded = false;
            }
        });
        this.breakpointObserver.observe(['(min-width: 768px) and (max-width: 991px)']).subscribe((result: BreakpointState) => {
            if (result.matches) {
                this.isExpanded = true;
            }
        });
        this.breakpointObserver.observe(['(min-width: 992px)']).subscribe((result: BreakpointState) => {
            if (result.matches) {
                this.isExpanded = true;
            }
        });
    }

    mouseleave() {
        this.breakpointObserver.observe(['(min-width: 0) and (max-width: 767px)']).subscribe((result: BreakpointState) => {
            if (result.matches && !this.showResponsive) {
                this.isExpanded = false;
            }
        });
        this.breakpointObserver.observe(['(min-width: 768px) and (max-width: 991px)']).subscribe((result: BreakpointState) => {
            if (result.matches && !this.showResponsive) {
                this.isExpanded = false;
            }
        });
        this.breakpointObserver.observe(['(min-width: 992px)']).subscribe((result: BreakpointState) => {
            if (result.matches && !this.showResponsive) {
                this.isExpanded = false;
            }
        });
    }

    responsiveFlag(event: boolean) {
        this.showResponsive = event;
    }

    expandedFlag(event: boolean) {
        this.isExpanded = event;
    }
}
