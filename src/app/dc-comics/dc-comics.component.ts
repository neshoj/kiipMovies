import { MovieService } from './../movie.service';
import { Component, OnInit } from '@angular/core';
import { MovieDetail } from 'app/MovieDetail';

@Component({
  selector: 'app-dc-comics',
  templateUrl: './dc-comics.component.html',
  styleUrls: ['./dc-comics.component.css']
})
export class DcComicsComponent implements OnInit {
  dcMovieCompanies = [429, 9993];
  displayList: MovieDetail[];
  constructor(private movieService: MovieService) {
    this.movieService.dcMovies = [];
    this.displayList = [];
  }

  ngOnInit() {
    this.getListOfMovies();
  }

  /**
   * Fetch list of movies from all DC companies
   */
  getListOfMovies(): void {
    this.movieService.fetchListOfMovies(this.dcMovieCompanies)
      .subscribe(details => {
        details.forEach(companyResult => {
          companyResult.results.forEach(movieItem => {
            this.movieService.dcMovies.push(this.movieService.manipulateImageURL(movieItem, 'w154'));  // add the new movie details
            this.movieService.dcMovies =
              this.movieService.removeDuplicates(
                this.movieService.sortMovieDetailsByDate(this.movieService.dcMovies), // sort by date
                 'original_title'); // remove duplicates
            this.displayList = this.movieService.dcMovies.slice(0, 6);
          });
        });
      });
  }


}
