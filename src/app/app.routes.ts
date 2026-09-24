import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
    { 
        path: 'login', 
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
        canActivate: [noAuthGuard]
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
        canActivate: [noAuthGuard]
    },
    { 
        path: '', 
        pathMatch: 'full',
        loadComponent: () => import('./features/home/home').then(m => m.Home),
        canActivate: [noAuthGuard]
    },
    {
        path: '',
        loadComponent: () => import('./shared/layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'permission',
                loadComponent: () => import('./features/dutyManagement/permission/permission').then(m => m.Permission)
            }
        ]
    }
];
