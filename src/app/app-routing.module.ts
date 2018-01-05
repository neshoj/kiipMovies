import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagenotfoundComponent } from 'app/pagenotfound/pagenotfound.component';
import { AboutUsComponent } from 'app/about-us/about-us.component';
import { ContactUsComponent } from 'app/contact-us/contact-us.component';
import { ExploreComponent } from 'app/explore/explore.component';
import { MovieDetailComponent } from 'app/movie-detail/movie-detail.component';
import { HomeComponent } from 'app/home/home.component';

const appRoutes: Routes = [
    { path: 'about', component: AboutUsComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'explore', component: ExploreComponent },
    { path: 'movie-detail/:id', component: MovieDetailComponent },
    { path: '', component: HomeComponent },
    { path: '**', component: PagenotfoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
