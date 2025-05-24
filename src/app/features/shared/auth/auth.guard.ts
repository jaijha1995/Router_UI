import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { AppState } from '../../../core/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  
  constructor(
    private authService: LocalStorageService, 
    private router: Router, 
    private store: Store<AppState>
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if (this.authService.getToken()) {
      return true; 
    } else {
      this.router.navigate(['/login']);
      return false; 
    }
  }
}
