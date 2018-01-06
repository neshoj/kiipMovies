import { Component, OnInit } from '@angular/core';
import { MovieService } from './../movie.service';
import { MovieDetail } from 'app/MovieDetail';
const marvelCompanyId = [420, 2301, 7505, 19551];

@Component({
  selector: 'app-marvel-comics',
  templateUrl: './marvel-comics.component.html',
  styleUrls: ['./marvel-comics.component.css']
})
export class MarvelComicsComponent implements OnInit {

  displayList: MovieDetail[];
  constructor(private movieService: MovieService) {
    this.movieService.marvelMovies = [];
    this.displayList = [];
  }

  ngOnInit() {
    this.getListOfMovies();
  }

  /**
   * Fetch list of all movies from all Marvel companies
   */
  getListOfMovies(): void {
    this.movieService.fetchListOfMovies(marvelCompanyId)
      .subscribe(details => {
        details.forEach(companyResult => {
          companyResult.results.forEach(movieItem => {
            this.movieService.marvelMovies.push(this.movieService.manipulateImageURL(movieItem, 'w500'));  // add the new movie details
            this.movieService.marvelMovies = this.movieService.removeDuplicates(
              this.movieService.sortMovieDetailsByDate(this.movieService.marvelMovies), // sort by date
               'original_title'); // remove duplicate
            this.displayList = this.movieService.marvelMovies.slice(0, 6);
          });
        });
      });
  }


}
