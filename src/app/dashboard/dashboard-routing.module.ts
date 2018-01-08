import { DashboardComponent } from './dashboard.component';
import { ContactUsComponent } from 'app/contact-us/contact-us.component';
import { AboutUsComponent } from 'app/about-us/about-us.component';
import { ExploreComponent } from './../explore/explore.component';
import { HomeComponent } from './../home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'app/auth-guard.service';
import { MovieDetailComponent } from 'app/movie-detail/movie-detail.component';

const dashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'explore',
                component: ExploreComponent
            },
            {
                path: 'about',
                component: AboutUsComponent
            },
            {
                path: 'contact-us',
                component: ContactUsComponent
            },
            {
                path: 'movie-detail/:id',
                component: MovieDetailComponent
            },
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule]
})
export class DashboardRouting { }
