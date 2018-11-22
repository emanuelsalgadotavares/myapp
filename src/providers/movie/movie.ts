import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

  private baseApiPath = 'https://api.themoviedb.org/3';

  constructor(public http: HttpClient) {
    console.log('Hello MovieProvider Provider');
  }

  public getLatestMovies(page = 1) {
    return this.http.get(this.baseApiPath + `/movie/popular?page=${page}&api_key=2ade51054bdca39cfd110147cd7a0ba0`);
  }

  public getMovieDetails(filmeId) {
    return this.http.get(this.baseApiPath + `/movie/${filmeId}?api_key=` + '2ade51054bdca39cfd110147cd7a0ba0');
  }

}
