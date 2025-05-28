import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/app.reducer';
import { selectUser } from '../../../../core/app.selector';
import { LocalStorageService } from '../../services/local-storage.service';
import { setToken, setUser } from '../../../../core/app.action';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  isDropdownOpen = false;
  user: any;

  constructor(
    private store : Store<AppState>,
    private lo : LocalStorageService,
    private notficationService : NotificationService,
    private router : Router
  ){
    this.store.select(selectUser).subscribe((res)=>{
      this.user = res;
    })
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!event.target.closest('.relative')) {
      this.isDropdownOpen = false;
    }
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    // Implement your logout logic here
    this.lo.clear()
    this.store.dispatch(setUser({user: null}))
    this.store.dispatch(setToken({token: null}))
    this.isDropdownOpen = false;
    this.notficationService.showSuccess("Logout successfully");
    this.router.navigate(['/login']);
  }

  goto() {
    this.router.navigate(['/superadmin/devices'])
  }
}
