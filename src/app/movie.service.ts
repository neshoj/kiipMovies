import { DetailsResult } from './DetailsResult';
import { MovieResp } from './MovieResp';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/forkJoin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


import { MovieDetail } from 'app/MovieDetail';
@Injectable()
export class MovieService {

  dcMovies: MovieDetail[];
  marvelMovies: MovieDetail[];

  mResp: MovieResp = {
    id: '',
    page: '',
    results: [],
    total_pages: '',
    total_results: ''
  };

  mdEmptyResp: DetailsResult = {
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

  private moviesBaseUrl = 'https://api.themoviedb.org/3/company/';
  private keyUrlPart = '/movies?api_key=a2da638d4865083b35ce7b5089b5761f&language=en-US';

  private movieDetailBaseURL = 'https://api.themoviedb.org/3/movie/';
  private mdKeyURL = '?api_key=a2da638d4865083b35ce7b5089b5761f&language=en-US';

  private movieDetailWithSimilar = 'https://api.themoviedb.org/3/movie/';
  private movieDetailWithSimilarKeyURL = '/similar?api_key=a2da638d4865083b35ce7b5089b5761f&language=en-US&page=1';
  private IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

  constructor(private http: HttpClient) { }

  /**
   *  Fetch multiple company movie lists
   * @param companyIds array of company ids
   */
  fetchListOfMovies(companyIds: number[]): Observable<MovieResp[]> {
    return Observable.forkJoin(
      companyIds.map(i => this.http.get<MovieResp>(this.moviesBaseUrl + i + this.keyUrlPart))
    );
  }

  /**
   * Fetch a list of movies from a particular company
   * @param companyId movie company identifier as refered by IMDB
   */
  fetchMoviesFromSingeCompany(companyId: number[]): Observable<MovieResp> {
    return this.http.get<MovieResp>(this.moviesBaseUrl + companyId + this.keyUrlPart)
      .pipe(this.handleError('FetchMovies', this.mResp))
      ;
  }

  /**
   * Manipulate image URI
   * @param movie a movie object
   * @param imageSize  the size of image to be refered
   */
  manipulateImageURL(movie: MovieDetail, imageSize: string): MovieDetail {
    movie.poster_path = this.IMAGE_BASE_URL + imageSize + movie.poster_path;
    return movie;
  }

  /**
   * Fetch movie details
   * @param imdb_id movie identifier from IMDB
   */
  fetchSingleMovieDetails(imdb_id: string): Observable<DetailsResult> {
    return this.http.get<DetailsResult>(this.movieDetailBaseURL + imdb_id + this.mdKeyURL);
    //   .pipe(this.handleError('FetchMovieDetail', this.mdEmptyResp));
  }

  /**
   * Fetch details by movie id and movies like it
   * @param imdb_id the movie identifier from IMDB
   */
  fetchSingleMovieDetailWithMoviesLike(imdb_id: string): Observable<any> {
    return Observable.forkJoin(
      this.http.get<DetailsResult>(this.movieDetailBaseURL + imdb_id + this.mdKeyURL),
      this.http.get<DetailsResult>(this.movieDetailWithSimilar + imdb_id + this.movieDetailWithSimilarKeyURL)
    );
  }

  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  /**
   * Order movie list by date
   * @param marvelMovies array of movies retrieved
   */
  sortMovieDetailsByDate(marvelMovies: MovieDetail[]): MovieDetail[] {
    return marvelMovies.sort((a, b) => {
      const dateA = new Date(a.release_date), dateB = new Date(b.release_date);
      return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
    });
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
