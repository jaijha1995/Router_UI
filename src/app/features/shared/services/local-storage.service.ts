import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/app.reducer';
import { selectToken } from '../../../core/app.selector';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../constant/api.constant';
import { ApiService } from './api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(
    private store: Store<AppState>,
    private apiService: ApiService
  ) {}
  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  //**setitem in localstorage */
  setItem(key: string, value: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
    }
  }

  //**getitem from localstorage */
  getItem(key: string): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(key);
    } else {
      return null;
    }
  }

  //**remove item from lovalstorage */
  removeItem(key: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
  }

  isLoggedIn() {
     this.store.select(selectToken).subscribe(token => {      
      let tokenvalue = token;
      return tokenvalue !== null; 
    });
  }

  getToken(): string | null {
    let tokenValue: string | null = null;
    this.store.select(selectToken).subscribe(token => {
      tokenValue = token;
    });
    return tokenValue;
  }

  login(payload: any): Observable<any> {
    let url = API_CONSTANT.login;
    return this.apiService
      .post(url, payload).pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  clear() {
    localStorage.removeItem('dabsah_token');
    localStorage.removeItem('dabsah_user');
    
  }
}