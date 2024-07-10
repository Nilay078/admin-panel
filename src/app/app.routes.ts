import { Routes } from '@angular/router';
import { PublicComponent } from './public/public.component';
import { AppUrlConstant } from './constant/app-url';
import { PrivateComponent } from './private/private.component';
import { NavigationUrl } from './constant/navigation-url';

export const routes: Routes = [
    {
        path: '',
        component: PublicComponent,
        children: [
            { path: '', redirectTo: 'public', pathMatch: 'full' },
            {
                path: AppUrlConstant.PUBLIC,
                loadChildren: () => import('../app/public/public.module').then(m => m.PublicModule),
            },
            {
                path: AppUrlConstant.ERROR,
                loadChildren: () => import('../app/error/error.module').then(m => m.ErrorModule),
            },
        ],
    },
    {
        path: '',
        component: PrivateComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../app/private/private.module').then(m => m.PrivateModule),
            },
        ],
    },
    {
        path: '**',
        redirectTo: NavigationUrl.PAGE_NOT_FOUND_URL,
    },
];
