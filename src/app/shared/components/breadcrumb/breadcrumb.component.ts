import { Component, Input } from '@angular/core';
import { Key_Value_String } from '../../../common/common-entities/entity';
import { Router } from '@angular/router';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
    @Input() breadcrumbs: Key_Value_String[] = [];

    constructor(private router: Router) {}

    changeRouting(breadcrumb: string) {
        this.router.navigate([breadcrumb]);
    }
}
