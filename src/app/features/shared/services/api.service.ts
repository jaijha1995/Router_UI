import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, ReplaySubject } from "rxjs";
import { catchError } from "rxjs/operators";


@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) { }

  responseType = {
    observe: "response",
  };

  miniCartSubject = new ReplaySubject(1);

  setBaseSiteIdLocal(url: string) {
    const formatedURl = 'http://3.110.185.148:8002/api/' + url
    return formatedURl;
  }


  get(urlData: any, options: any = {}): Observable<any> {
    let requestOptions = { ...this.responseType, ...options };
    return this.http
      .get(this.setBaseSiteIdLocal(urlData), requestOptions)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  post(url: any, payload: any, options: any = {}): Observable<any> {
    let requestOptions = { ...options, ...this.responseType };
    return this.http.post(this.setBaseSiteIdLocal(url), payload, requestOptions);
  }

  put(url: any, payload: any, options: any = {}) {
    let requestOptions = { ...options, ...this.responseType };
    return this.http
      .put(this.setBaseSiteIdLocal(url), payload, requestOptions)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  patch(url: any, payload: any, options: any = {}) {
    let requestOptions = { ...options, ...this.responseType };
    return this.http
      .patch(this.setBaseSiteIdLocal(url), payload, requestOptions)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  delete(url: any, options: any = {}): Observable<any> {
    let requestOptions = { ...options, ...this.responseType };
    return this.http
      .delete(this.setBaseSiteIdLocal(url), requestOptions)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
