import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DcComicsComponent } from './dc-comics/dc-comics.component';
import { MarvelComicsComponent } from './marvel-comics/marvel-comics.component';
import { ExploreComponent } from './explore/explore.component';
import { PagenotfoundComponent } from 'app/pagenotfound/pagenotfound.component';
import { MovieService } from './movie.service';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { AuthGuard } from 'app/auth-guard.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { DashboardRouting } from 'app/dashboard/dashboard-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    JumbotronComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    DcComicsComponent,
    MarvelComicsComponent,
    ExploreComponent,
    PagenotfoundComponent,
    MovieDetailComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    DashboardRouting,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [MovieService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
