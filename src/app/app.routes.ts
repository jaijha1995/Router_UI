import { Routes } from '@angular/router';
import { LoginComponent } from './features/shared/components/login/login.component';
import { PageNotFoundComponent } from './features/shared/components/page-not-found/page-not-found.component';
import { MainLayoutComponent } from './features/shared/layout/main-layout/main-layout.component';
import { authGuard } from './features/shared/auth/auth.guard';

export const routes: Routes = [

    {
        path: 'login', component: LoginComponent
    },
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'superadmin',
        component : MainLayoutComponent,
        canActivate : [authGuard],
        loadChildren: () => import('./features/superadmin/superadmin.module').then(m => m.SuperadminModule)
    },
    {
        path: '**', component: PageNotFoundComponent
    },
];
