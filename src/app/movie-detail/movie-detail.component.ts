import { Observable } from 'rxjs/Observable';
import { MovieResp } from './../MovieResp';
import { DetailsResult } from 'app/DetailsResult';
import { MovieDetail } from './../MovieDetail';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { MovieService } from 'app/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  moviesLike: MovieDetail[];
  movie: DetailsResult = {
    adult: false,
    backdrop_path: '',
    budget: 0,
    genres: [],
    homepage: '',
    id: 0,
    imdb_id: '',
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    production_companies: [],
    release_date: '',
    runtime: 0,
    status: '',
    tagline: '',
    title: '',
    vote_average: 0,
    vote_count: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private location: Location) { this.moviesLike = []; }

  ngOnInit() {
    this.getMovieDetail();
  }

  getMovieDetail(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.fetchDetails(params.get('id')))
      .subscribe(details => {

        this.movie = details[0];
        this.movie.poster_path = 'https://image.tmdb.org/t/p/w500' + details[0].poster_path;

        if (details[1]) {
          this.prepareMoviesLike((<MovieResp>details[1]));
        }
      });
    ;
  }

  fetchDetails(id: string): Observable<any> {
    return this.movieService.fetchSingleMovieDetailWithMoviesLike(id);
  }

  prepareMoviesLike(details: MovieResp): void {
    this.moviesLike = [];
    if (details.results.length > 0) {
      details.results.forEach(movie => {
        this.moviesLike.push(this.movieService.manipulateImageURL(movie, 'w342'));
      });
    }
    this.movieService.removeDuplicates(
      this.movieService.sortMovieDetailsByDate(this.moviesLike), // sort by date
      'original_title'); // remove duplicates
    this.moviesLike = this.moviesLike.slice(0, 3);
  }

  exploreMore(): void {
    console.log('asked to go back');
    this.router.navigate(['/explore']);
  }
}
