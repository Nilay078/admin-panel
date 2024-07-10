import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrl: './error.component.scss',
})
export class ErrorComponent {
    errorCode!: string;
    errorTitle!: string;
    errorDescription!: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.errorCode = route.snapshot.data['errorCode'];
        this.errorTitle = route.snapshot.data['errorTitle'];
        this.errorDescription = route.snapshot.data['errorMessage'];
    }

    homePage() {
        this.router.navigate(['']);
    }
}
