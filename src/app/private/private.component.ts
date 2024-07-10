import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
    selector: 'app-private',
    standalone: true,
    imports: [RouterModule, SharedModule],
    template: `<app-sidebar></app-sidebar>`,
})
export class PrivateComponent {}
