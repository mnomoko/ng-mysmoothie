import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Smoothie} from '../models/smoothie';

const smoothiesUrl = 'http://localhost:4000/api/v1/smoothies';

@Injectable()
export class SmoothieService {
  constructor(private http: HttpClient) {}

  getSmoothies(): Observable<Smoothie[]> {
    return this.http
      .get<Smoothie[]>(smoothiesUrl);
  }

  getSmoothie(id: number): Observable<Smoothie> {
    return this.http
      .get<Smoothie>(`${smoothiesUrl}/${id}`);
  }

  postSmoothie(smoothie) {
    return this.http
      .post(smoothiesUrl, smoothie)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
