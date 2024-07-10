import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicModule } from './public/public.module';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, PublicModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'alumnly-super-admin';
}
