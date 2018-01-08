import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { PagenotfoundComponent } from 'app/pagenotfound/pagenotfound.component';
import { AboutUsComponent } from 'app/about-us/about-us.component';
import { ContactUsComponent } from 'app/contact-us/contact-us.component';
import { ExploreComponent } from 'app/explore/explore.component';
import { MovieDetailComponent } from 'app/movie-detail/movie-detail.component';
import { HomeComponent } from 'app/home/home.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '**', component: PagenotfoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
