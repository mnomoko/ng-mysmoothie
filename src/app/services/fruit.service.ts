import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Fruit } from '../models/fruit';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';

const baseUrl = environment.apiUrl;
const fruitsUrl = `${baseUrl}/api/v1/fruits`;

@Injectable()
export class FruitService {
  constructor(private http: HttpClient) {}

  getFruits(): Observable<Fruit[]> {
    return this.http
      .get<Fruit[]>(fruitsUrl);
  }

  getFruit(id: number): Observable<Fruit> {
    return this.http
      .get<Fruit>(`${fruitsUrl}/${id}`);
  }

  postFruit(fruit) {
    return this.http
      .post(fruitsUrl, fruit)
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
