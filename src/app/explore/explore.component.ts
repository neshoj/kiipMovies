import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { MovieService } from 'app/movie.service';
import { MovieDetail } from 'app/MovieDetail';
import { Exploreopts } from 'app/exploreopts';


const movieCompanies = [429, 420, 2301, 7505, 9993, 19551];
const companyDC = [429, 9993];
const companyMarvel = [420, 2301, 7505, 19551];

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  exploreOpt: Exploreopts[] = [
    { id: 1, desc: 'Marvel and DC Movies' },
    { id: 2, desc: 'DC Movies' },
    { id: 3, desc: 'Marvel Movies' }
  ];
  selectedOpt: Exploreopts = this.exploreOpt[0];
  displayList: MovieDetail[];
  constructor(private movieService: MovieService) { this.displayList = []; }

  ngOnInit() {
    this.getListOfMovies(this.selectedOpt);
  }

  optionBasedCompanyIdList(selectedOpt: Exploreopts): number[] {
    let companyList = [];
    if (selectedOpt.id === 1) {
      companyList = movieCompanies;
    } else if (selectedOpt.id === 2) {
      companyList = companyDC;
    } else if (selectedOpt.id === 3) {
      companyList = companyMarvel;
    }
    return companyList;
  }

  /**
   * Return all movies from selected option
   * @param selectedOpt selected option
   */
  getListOfMovies(selectedOpt: Exploreopts): void {
    this.displayList = [];
    this.movieService.fetchListOfMovies(this.optionBasedCompanyIdList(selectedOpt))
      .subscribe(details => {
        details.forEach(companyResult => {
          companyResult.results.forEach(movieItem => {
            this.displayList.push(this.movieService.manipulateImageURL(movieItem, 'w154'));  // add movie details
          });
        });
        this.displayList = this.movieService.removeDuplicates(
          this.movieService.sortMovieDetailsByDate(this.displayList), // sort by date
          'original_title'); // remove duplicates
      });
  }

  /**
   * 
   * @param productId Handle select option
   */
  onSelect(productId) {
    this.exploreOpt.forEach(element => {
      if (element.id === +productId.target.value) {
        this.selectedOpt = element;
      }
    });
    this.getListOfMovies(this.selectedOpt);
  }
}
